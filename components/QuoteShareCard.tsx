import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { Quote } from '../types';

interface QuoteShareCardProps {
    quote: Quote;
}

const { width } = Dimensions.get('window');
const CARD_SIZE = width; // Square 1:1

export const QuoteShareCard = ({ quote }: QuoteShareCardProps) => {
    return (
        <View
            style={{ width: CARD_SIZE, height: CARD_SIZE }}
            className="bg-[#F5F5DC] p-12 justify-center items-center"
        >
            <View className="items-center w-full">
                <Text
                    className="text-zinc-400 text-[10px] uppercase tracking-[0.4em] mb-4"
                    style={{ fontFamily: 'Inter_400Regular' }}
                >
                    Estoicismo Diario
                </Text>

                <View className="h-[1px] w-8 bg-zinc-300 mb-8" />

                <Text
                    className="text-2xl text-zinc-800 text-center leading-relaxed mb-10 px-4"
                    style={{ fontFamily: 'Merriweather_400Regular' }}
                >
                    "{quote.text}"
                </Text>

                <View className="h-[1px] w-8 bg-zinc-300 mb-8" />

                <Text
                    className="text-xs uppercase tracking-[0.3em] text-zinc-500 font-medium"
                    style={{ fontFamily: 'Inter_400Regular' }}
                >
                    {quote.author}
                </Text>
            </View>

            <Text
                className="absolute bottom-8 text-zinc-400 text-[8px] tracking-widest"
                style={{ fontFamily: 'Inter_400Regular' }}
            >
                @estoicismo_diario
            </Text>
        </View>
    );
};
