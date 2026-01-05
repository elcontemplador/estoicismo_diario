import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

const FAVORITES_KEY = '@estoicismo_diario_favorites';

export const useFavorites = () => {
    const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load favorites from AsyncStorage on mount
    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        try {
            const stored = await AsyncStorage.getItem(FAVORITES_KEY);
            if (stored) {
                setFavoriteIds(JSON.parse(stored));
            }
        } catch (error) {
            console.error('Error loading favorites:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const saveFavorites = async (ids: number[]) => {
        try {
            await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
        } catch (error) {
            console.error('Error saving favorites:', error);
        }
    };

    const toggleFavorite = useCallback(async (id: number) => {
        setFavoriteIds(prev => {
            const newIds = prev.includes(id)
                ? prev.filter(fid => fid !== id)
                : [...prev, id];
            saveFavorites(newIds);
            return newIds;
        });
    }, []);

    const isFavorite = useCallback((id: number) => {
        return favoriteIds.includes(id);
    }, [favoriteIds]);

    return {
        favoriteIds,
        isLoading,
        toggleFavorite,
        isFavorite,
    };
};
