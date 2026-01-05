import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { Merriweather_400Regular, Merriweather_700Bold, useFonts } from '@expo-google-fonts/merriweather';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';
import 'react-native-reanimated';
import '../global.css';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [loaded, error] = useFonts({
    Merriweather_400Regular,
    Merriweather_700Bold,
    Inter_400Regular,
    Inter_700Bold,
  });

  // Set light mode as default on first load
  useEffect(() => {
    if (colorScheme === undefined || colorScheme === null) {
      setColorScheme('light');
    }
  }, []);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  // Default to light if colorScheme is undefined
  const effectiveColorScheme = colorScheme ?? 'light';

  return (
    <ThemeProvider value={effectiveColorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style={effectiveColorScheme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}
