import * as Sharing from 'expo-sharing';
import { useCallback, useRef, useState } from 'react';
import { captureRef } from 'react-native-view-shot';
import { Quote } from '../types';

export const useShareQuote = () => {
    const shareViewRef = useRef(null);
    const [sharingQuote, setSharingQuote] = useState<Quote | null>(null);
    const [isSharing, setIsSharing] = useState(false);

    const shareQuote = useCallback(async (quote: Quote) => {
        setSharingQuote(quote);
        setIsSharing(true);

        // We need to wait for the hidden view to render
        // This is handled in the UI by checking sharingQuote
    }, []);

    const executeCapture = useCallback(async () => {
        if (!shareViewRef.current) return;

        try {
            const uri = await captureRef(shareViewRef.current, {
                format: 'png',
                quality: 1.0,
            });

            await Sharing.shareAsync(uri);
        } catch (error) {
            console.error('Error sharing quote:', error);
        } finally {
            setIsSharing(false);
            setSharingQuote(null);
        }
    }, []);

    return {
        shareViewRef,
        sharingQuote,
        isSharing,
        shareQuote,
        executeCapture,
    };
};
