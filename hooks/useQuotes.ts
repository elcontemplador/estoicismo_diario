import { useCallback, useState } from 'react';
import quotesData from '../data/quotes.json';
import { Quote } from '../types';

export const useQuotes = () => {
    const [quotes] = useState<Quote[]>(quotesData as Quote[]);

    const getRandomQuote = useCallback(() => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        return quotes[randomIndex];
    }, [quotes]);

    const getUniqueAuthors = useCallback(() => {
        const authors = quotes.map(q => q.author);
        return Array.from(new Set(authors)).sort();
    }, [quotes]);

    const getQuotesByAuthor = useCallback((author: string) => {
        return quotes.filter(q => q.author === author);
    }, [quotes]);

    const getAllQuotes = useCallback(() => {
        return quotes;
    }, [quotes]);

    return {
        quotes,
        getRandomQuote,
        getUniqueAuthors,
        getQuotesByAuthor,
        getAllQuotes,
    };
};
