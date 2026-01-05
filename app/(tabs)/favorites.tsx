import { BookHeart, Heart, Sparkles } from 'lucide-react-native';
import React, { useEffect, useRef } from 'react';
import { Animated, FlatList, SafeAreaView, Text, View } from 'react-native';
import { QuoteCard } from '../../components/QuoteCard';
import { QuoteShareCard } from '../../components/QuoteShareCard';
import { useFavorites } from '../../hooks/useFavorites';
import { useQuotes } from '../../hooks/useQuotes';
import { useShareQuote } from '../../hooks/useShareQuote';

export default function Favorites() {
    const { quotes } = useQuotes();
    const { favoriteIds, isLoading, toggleFavorite, isFavorite } = useFavorites();
    const { shareViewRef, sharingQuote, shareQuote, executeCapture } = useShareQuote();

    const favoriteQuotes = quotes.filter(q => favoriteIds.includes(q.id));

    // Animation for empty state
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (favoriteQuotes.length === 0) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, {
                        toValue: 1.1,
                        duration: 1500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(pulseAnim, {
                        toValue: 1,
                        duration: 1500,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        }
    }, [favoriteQuotes.length]);

    useEffect(() => {
        if (sharingQuote) {
            setTimeout(executeCapture, 100);
        }
    }, [sharingQuote, executeCapture]);

    if (isLoading) {
        return (
            <SafeAreaView className="flex-1 bg-slate-50 dark:bg-zinc-950 justify-center items-center">
                <Animated.View style={{ opacity: pulseAnim }}>
                    <Heart size={32} color="#a1a1aa" />
                </Animated.View>
                <Text className="text-zinc-500 dark:text-zinc-400 mt-4" style={{ fontFamily: 'Inter_400Regular' }}>
                    Cargando favoritos...
                </Text>
            </SafeAreaView>
        );
    }

    if (favoriteQuotes.length === 0) {
        return (
            <SafeAreaView className="flex-1 bg-slate-50 dark:bg-zinc-950">
                <View className="flex-1 justify-center items-center p-8">
                    {/* Decorative container */}
                    <View className="relative mb-8">
                        <Animated.View
                            style={{ transform: [{ scale: pulseAnim }] }}
                            className="w-28 h-28 rounded-full bg-gradient-to-br from-rose-100 to-pink-50 dark:from-rose-950 dark:to-pink-950 items-center justify-center"
                        >
                            <BookHeart size={48} color="#f43f5e" strokeWidth={1.5} />
                        </Animated.View>
                        <View className="absolute -top-1 -right-1">
                            <Sparkles size={20} color="#fbbf24" fill="#fbbf24" />
                        </View>
                    </View>

                    <Text
                        className="text-2xl text-zinc-800 dark:text-zinc-100 mb-3 text-center"
                        style={{ fontFamily: 'Merriweather_700Bold' }}
                    >
                        Tu colección personal
                    </Text>

                    <Text
                        className="text-zinc-500 dark:text-zinc-400 text-center leading-relaxed max-w-xs"
                        style={{ fontFamily: 'Inter_400Regular' }}
                    >
                        Guarda las citas que más te inspiren pulsando el corazón. Aquí las tendrás siempre a mano.
                    </Text>

                    {/* Decorative hint */}
                    <View className="mt-8 flex-row items-center bg-white dark:bg-zinc-900 px-5 py-3 rounded-full border border-slate-100 dark:border-zinc-800">
                        <Heart size={16} color="#ef4444" fill="#ef4444" />
                        <Text
                            className="ml-2 text-xs text-zinc-500 dark:text-zinc-400"
                            style={{ fontFamily: 'Inter_400Regular' }}
                        >
                            Toca el corazón en cualquier cita
                        </Text>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-slate-50 dark:bg-zinc-950">
            {/* Header with counter */}
            <View className="px-6 pt-8 pb-4">
                <View className="flex-row items-center justify-between">
                    <View>
                        <Text
                            className="text-3xl text-zinc-800 dark:text-zinc-100"
                            style={{ fontFamily: 'Merriweather_700Bold' }}
                        >
                            Favoritos
                        </Text>
                        <Text
                            className="text-zinc-400 dark:text-zinc-500 mt-1"
                            style={{ fontFamily: 'Inter_400Regular' }}
                        >
                            Tu colección personal
                        </Text>
                    </View>

                    {/* Counter badge */}
                    <View className="bg-rose-100 dark:bg-rose-950 px-4 py-2 rounded-full flex-row items-center">
                        <Heart size={14} color="#ef4444" fill="#ef4444" />
                        <Text
                            className="ml-2 text-rose-600 dark:text-rose-400 font-semibold"
                            style={{ fontFamily: 'Inter_400Regular' }}
                        >
                            {favoriteQuotes.length}
                        </Text>
                    </View>
                </View>
            </View>

            <FlatList
                data={favoriteQuotes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                    <Animated.View
                        style={{
                            opacity: 1,
                            transform: [{ translateY: 0 }],
                        }}
                    >
                        <QuoteCard
                            quote={item}
                            isFavorite={isFavorite(item.id)}
                            onToggleFavorite={toggleFavorite}
                            onShare={shareQuote}
                        />
                    </Animated.View>
                )}
                contentContainerStyle={{ paddingBottom: 32 }}
                showsVerticalScrollIndicator={false}
            />

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
