import { useColorScheme } from '@/hooks/use-color-scheme';
import { RefreshCw } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { QuoteCard } from '../../components/QuoteCard';
import { QuoteShareCard } from '../../components/QuoteShareCard';
import { useFavorites } from '../../hooks/useFavorites';
import { useQuotes } from '../../hooks/useQuotes';
import { useShareQuote } from '../../hooks/useShareQuote';
import { Quote } from '../../types';

export default function Home() {
  const { getRandomQuote } = useQuotes();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { shareViewRef, sharingQuote, shareQuote, executeCapture } = useShareQuote();
  const colorScheme = useColorScheme();
  const [quote, setQuote] = useState<Quote | null>(null);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    refreshQuote();
  }, []);

  // When sharingQuote is set, we need to wait a frame for it to render then capture
  useEffect(() => {
    if (sharingQuote) {
      setTimeout(executeCapture, 100);
    }
  }, [sharingQuote, executeCapture]);

  const refreshQuote = () => {
    // Animate out
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Change quote
      setQuote(getRandomQuote());

      // Animate in
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    });

    // Rotate refresh button
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      rotateAnim.setValue(0);
    });
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  if (!quote) return null;

  return (
    <SafeAreaView className="flex-1 bg-slate-50 dark:bg-zinc-950">
      <View className="flex-1 justify-center items-center px-2">
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
            width: '100%',
          }}
        >
          <QuoteCard
            quote={quote}
            isFavorite={isFavorite(quote.id)}
            onToggleFavorite={toggleFavorite}
            onShare={shareQuote}
            fullHeight={true}
          />
        </Animated.View>

        <TouchableOpacity
          onPress={refreshQuote}
          activeOpacity={0.8}
          className="mt-10 bg-zinc-900 dark:bg-zinc-100 p-5 rounded-full"
          style={{
            shadowColor: colorScheme === 'dark' ? '#fff' : '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 12,
            elevation: 6,
          }}
        >
          <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <RefreshCw size={26} color={colorScheme === 'dark' ? '#18181b' : '#ffffff'} strokeWidth={2.5} />
          </Animated.View>
        </TouchableOpacity>

        <Text
          className="mt-5 text-zinc-400 dark:text-zinc-500 text-xs uppercase tracking-[0.15em]"
          style={{ fontFamily: 'Inter_400Regular' }}
        >
          Toca para otra cita
        </Text>
      </View>

      {/* Hidden view for capture */}
      {sharingQuote && (
        <View
          collapsable={false}
          ref={shareViewRef}
          style={{ position: 'absolute', left: -9999 }}
        >
          <QuoteShareCard quote={sharingQuote} />
        </View>
      )}
    </SafeAreaView>
  );
}
