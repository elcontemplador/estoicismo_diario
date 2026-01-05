import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, Quote } from 'lucide-react-native';
import React, { useEffect, useMemo } from 'react';
import { FlatList, Platform, Text, TouchableOpacity, View } from 'react-native';
import { QuoteCard } from '../../../components/QuoteCard';
import { QuoteShareCard } from '../../../components/QuoteShareCard';
import { useFavorites } from '../../../hooks/useFavorites';
import { useQuotes } from '../../../hooks/useQuotes';
import { useShareQuote } from '../../../hooks/useShareQuote';

export default function AuthorDetail() {
    const { name } = useLocalSearchParams<{ name: string }>();
    const { getQuotesByAuthor } = useQuotes();
    const { toggleFavorite, isFavorite } = useFavorites();
    const { shareViewRef, sharingQuote, shareQuote, executeCapture } = useShareQuote();
    const router = useRouter();
    const quotes = getQuotesByAuthor(name);

    const initial = useMemo(() => name?.charAt(0).toUpperCase() || '?', [name]);

    const getInitialColor = (initial: string) => {
        const colors = [
            { bg: 'bg-rose-100 dark:bg-rose-950', text: 'text-rose-600 dark:text-rose-400' },
            { bg: 'bg-blue-100 dark:bg-blue-950', text: 'text-blue-600 dark:text-blue-400' },
            { bg: 'bg-amber-100 dark:bg-amber-950', text: 'text-amber-600 dark:text-amber-400' },
            { bg: 'bg-emerald-100 dark:bg-emerald-950', text: 'text-emerald-600 dark:text-emerald-400' },
            { bg: 'bg-violet-100 dark:bg-violet-950', text: 'text-violet-600 dark:text-violet-400' },
            { bg: 'bg-cyan-100 dark:bg-cyan-950', text: 'text-cyan-600 dark:text-cyan-400' },
        ];
        const index = initial.charCodeAt(0) % colors.length;
        return colors[index];
    };

    const colorScheme = getInitialColor(initial);

    useEffect(() => {
        if (sharingQuote) {
            setTimeout(executeCapture, 100);
        }
    }, [sharingQuote, executeCapture]);

    return (
        <View className="flex-1 bg-slate-50 dark:bg-zinc-950">
            {/* Header */}
            <View
                className="px-4 pt-12 pb-4 bg-white dark:bg-zinc-900 border-b border-slate-100 dark:border-zinc-800"
                style={{
                    ...Platform.select({
                        ios: {
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.03,
                            shadowRadius: 8,
                        },
                    }),
                }}
            >
                {/* Back button */}
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="flex-row items-center mb-4"
                    activeOpacity={0.7}
                >
                    <ChevronLeft size={24} color="#71717a" />
                    <Text
                        className="text-zinc-500 dark:text-zinc-400 text-sm ml-1"
                        style={{ fontFamily: 'Inter_400Regular' }}
                    >
                        Autores
                    </Text>
                </TouchableOpacity>

                {/* Author info */}
                <View className="flex-row items-center">
                    <View className={`w-14 h-14 rounded-full items-center justify-center ${colorScheme.bg}`}>
                        <Text
                            className={`text-xl font-bold ${colorScheme.text}`}
                            style={{ fontFamily: 'Merriweather_700Bold' }}
                        >
                            {initial}
                        </Text>
                    </View>

                    <View className="ml-4 flex-1">
                        <Text
                            className="text-2xl text-zinc-800 dark:text-zinc-100"
                            style={{ fontFamily: 'Merriweather_700Bold' }}
                        >
                            {name}
                        </Text>
                        <View className="flex-row items-center mt-1">
                            <Quote size={14} color="#a1a1aa" />
                            <Text
                                className="text-sm text-zinc-400 dark:text-zinc-500 ml-1"
                                style={{ fontFamily: 'Inter_400Regular' }}
                            >
                                {quotes.length} {quotes.length === 1 ? 'cita' : 'citas'}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            <FlatList
                data={quotes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <QuoteCard
                        quote={item}
                        isFavorite={isFavorite(item.id)}
                        onToggleFavorite={toggleFavorite}
                        onShare={shareQuote}
                    />
                )}
                contentContainerStyle={{ paddingVertical: 16 }}
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
        </View>
    );
}
