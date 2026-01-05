import { Stack } from 'expo-router';
import React from 'react';

export default function AuthorsLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="[name]" />
        </Stack>
    );
}
