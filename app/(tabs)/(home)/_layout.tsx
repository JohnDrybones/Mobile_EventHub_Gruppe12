

import { useAuth } from '@/context/AuthProvider';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Stack } from 'expo-router';

export default function HomeLayout() {
  const colorScheme = useColorScheme();
  const { isLoggedIn } = useAuth();
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
