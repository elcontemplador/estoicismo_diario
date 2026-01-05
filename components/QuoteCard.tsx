import * as Haptics from 'expo-haptics';
import { Heart, Share } from 'lucide-react-native';
import React from 'react';
import { Dimensions, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Quote } from '../types';

interface QuoteCardProps {
    quote: Quote;
    isFavorite?: boolean;
    onToggleFavorite?: (id: number) => void;
    onShare?: (quote: Quote) => void;
    fullHeight?: boolean; // For Home screen to use more vertical space
}

const { height: screenHeight } = Dimensions.get('window');

export const QuoteCard = ({ quote, isFavorite = false, onToggleFavorite, onShare, fullHeight = false }: QuoteCardProps) => {
    const handleFavoritePress = async () => {
        if (onToggleFavorite) {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            onToggleFavorite(quote.id);
        }
    };

    const handleSharePress = async () => {
        if (onShare) {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            onShare(quote);
        }
    };

    // Dynamic height: 60% of screen for fullHeight mode, otherwise min 380px
    const cardHeight = fullHeight ? screenHeight * 0.58 : undefined;
    const minHeight = fullHeight ? screenHeight * 0.58 : 380;

    return (
        <View
            className="bg-white dark:bg-zinc-900 mx-4 my-2 rounded-3xl border border-slate-100 dark:border-zinc-800 relative overflow-hidden"
            style={{
                height: cardHeight,
                minHeight: minHeight,
                ...Platform.select({
                    ios: {
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 8 },
                        shadowOpacity: 0.08,
                        shadowRadius: 24,
                    },
                    android: {
                        elevation: 4,
                    },
                    web: {
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                    },
                }),
            }}
        >
            {/* Decorative quote mark */}
            <Text
                className="absolute -top-6 left-4 text-[140px] text-slate-100 dark:text-zinc-800 opacity-50"
                style={{ fontFamily: 'Merriweather_700Bold' }}
            >
                "
            </Text>

            {/* Action buttons */}
            <View className="absolute top-4 right-4 flex-row items-center z-10">
                {onShare && (
                    <TouchableOpacity
                        onPress={handleSharePress}
                        activeOpacity={0.6}
                        className="p-3 mr-1 rounded-full bg-slate-50 dark:bg-zinc-800"
                        style={{
                            ...Platform.select({
                                ios: {
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.05,
                                    shadowRadius: 4,
                                },
                            }),
                        }}
                    >
                        <Share size={18} color="#a1a1aa" />
                    </TouchableOpacity>
                )}

                {onToggleFavorite && (
                    <TouchableOpacity
                        onPress={handleFavoritePress}
                        activeOpacity={0.6}
                        className={`p-3 rounded-full ${isFavorite ? 'bg-red-50 dark:bg-red-950' : 'bg-slate-50 dark:bg-zinc-800'}`}
                        style={{
                            ...Platform.select({
                                ios: {
                                    shadowColor: isFavorite ? '#ef4444' : '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: isFavorite ? 0.2 : 0.05,
                                    shadowRadius: 4,
                                },
                            }),
                        }}
                    >
                        <Heart
                            size={18}
                            color={isFavorite ? '#ef4444' : '#a1a1aa'}
                            fill={isFavorite ? '#ef4444' : 'transparent'}
                        />
                    </TouchableOpacity>
                )}
            </View>

            {/* Quote content */}
            <View className="flex-1 px-6 pt-14 pb-6 justify-center">
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingVertical: 8 }}
                >
                    <Text
                        className="text-lg text-zinc-800 dark:text-zinc-100 text-center leading-8"
                        style={{ fontFamily: 'Merriweather_400Regular' }}
                    >
                        {quote.text}
                    </Text>

                    <View className="mt-6 items-center">
                        <View className="flex-row items-center mb-3">
                            <View className="h-[1px] w-8 bg-slate-200 dark:bg-zinc-700" />
                            <View className="w-2 h-2 rounded-full bg-slate-300 dark:bg-zinc-600 mx-3" />
                            <View className="h-[1px] w-8 bg-slate-200 dark:bg-zinc-700" />
                        </View>
                        <Text
                            className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 font-semibold"
                            style={{ fontFamily: 'Inter_400Regular' }}
                        >
                            {quote.author}
                        </Text>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};
