import { Link } from 'expo-router';
import { ChevronRight, Quote } from 'lucide-react-native';
import React, { useMemo } from 'react';
import { FlatList, Platform, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useQuotes } from '../../../hooks/useQuotes';

export default function Authors() {
    const { getUniqueAuthors, getQuotesByAuthor } = useQuotes();
    const authors = getUniqueAuthors();

    // Memoize author data with quote counts
    const authorsWithCounts = useMemo(() => {
        return authors.map(author => ({
            name: author,
            quoteCount: getQuotesByAuthor(author).length,
            initial: author.charAt(0).toUpperCase(),
        }));
    }, [authors, getQuotesByAuthor]);

    const getInitialColor = (initial: string) => {
        const colors = [
            'bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400',
            'bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400',
            'bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400',
            'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400',
            'bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400',
            'bg-cyan-100 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400',
        ];
        const index = initial.charCodeAt(0) % colors.length;
        return colors[index];
    };

    return (
        <SafeAreaView className="flex-1 bg-slate-50 dark:bg-zinc-950">
            {/* Header */}
            <View className="px-6 pt-8 pb-4">
                <Text
                    className="text-3xl text-zinc-800 dark:text-zinc-100"
                    style={{ fontFamily: 'Merriweather_700Bold' }}
                >
                    Autores
                </Text>
                <Text
                    className="text-zinc-400 dark:text-zinc-500 mt-1"
                    style={{ fontFamily: 'Inter_400Regular' }}
                >
                    {authors.length} filósofos • Explora por origen
                </Text>
            </View>

            <FlatList
                data={authorsWithCounts}
                keyExtractor={(item) => item.name}
                contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
                renderItem={({ item }) => (
                    <Link href={`/(tabs)/authors/${item.name}` as any} asChild>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            className="flex-row items-center bg-white dark:bg-zinc-900 p-4 rounded-2xl mb-3 border border-slate-100 dark:border-zinc-800"
                            style={{
                                ...Platform.select({
                                    ios: {
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.04,
                                        shadowRadius: 8,
                                    },
                                    android: {
                                        elevation: 2,
                                    },
                                }),
                            }}
                        >
                            {/* Author Initial Avatar */}
                            <View className={`w-12 h-12 rounded-full items-center justify-center ${getInitialColor(item.initial).split(' ').slice(0, 2).join(' ')}`}>
                                <Text
                                    className={`text-lg font-bold ${getInitialColor(item.initial).split(' ').slice(2).join(' ')}`}
                                    style={{ fontFamily: 'Merriweather_700Bold' }}
                                >
                                    {item.initial}
                                </Text>
                            </View>

                            {/* Author Info */}
                            <View className="flex-1 ml-4">
                                <Text
                                    className="text-base text-zinc-800 dark:text-zinc-100"
                                    style={{ fontFamily: 'Inter_400Regular' }}
                                >
                                    {item.name}
                                </Text>
                                <View className="flex-row items-center mt-1">
                                    <Quote size={12} color="#a1a1aa" />
                                    <Text
                                        className="text-xs text-zinc-400 dark:text-zinc-500 ml-1"
                                        style={{ fontFamily: 'Inter_400Regular' }}
                                    >
                                        {item.quoteCount} {item.quoteCount === 1 ? 'cita' : 'citas'}
                                    </Text>
                                </View>
                            </View>

                            {/* Arrow */}
                            <ChevronRight size={20} color="#d4d4d8" />
                        </TouchableOpacity>
                    </Link>
                )}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}
