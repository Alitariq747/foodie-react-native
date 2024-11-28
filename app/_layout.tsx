import '../global.css';

import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from '~/Providers/CartProvider';
import  AuthProvider  from '~/Providers/AuthProvider';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="light"><AuthProvider>
        <QueryClientProvider client={queryClient}>
          <CartProvider>
            <Stack>
              <Stack.Screen name="(user)" options={{ headerShown: false }} />
              <Stack.Screen name="(admin)" options={{ headerShown: false }} />

              <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
            </Stack>
          </CartProvider>
        </QueryClientProvider>
      </AuthProvider></GluestackUIProvider>
  );
}
