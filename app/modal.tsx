import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform, Pressable, Text } from 'react-native';

import { useAuth } from '~/Providers/AuthProvider';
import Auth from '~/components/Auth';

export default function Modal() {
  const { session } = useAuth();

  const router = useRouter()

  const handleDismiss = () => {
    router.back()
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: session ? 'Welcome to Foodie' : 'Authorize',
          headerTintColor: '#334155',
          headerRight: () => (
            <Pressable onPress={handleDismiss}>
              <Text>Dismiss</Text>
            </Pressable>
          ),
        }}
      />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <Auth />
    </>
  );
}
