import EvilIcons from '@expo/vector-icons/EvilIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import { Pressable, Text } from 'react-native';

import { useCart } from '~/Providers/CartProvider';
import UserHeaderButton from '~/components/UserHeaderButton';

export default function TabLayout() {
  const { clearCart, items } = useCart();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
      }}>
      <Tabs.Screen
        name="menu"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons name="menu-outline" size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          // headerRight: () => <UserHeaderButton />,
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons name="receipt-outline" size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color }) => <EvilIcons name="cart" size={24} color={color} />,
          headerLeft: () =>
            items.length > 0 ? (
              <Pressable onPress={clearCart}>
                <Text className="ml-4 text-sm font-extralight text-slate-950">Empty Cart</Text>
              </Pressable>
            ) : null,
          headerRight: () => <UserHeaderButton />,
        }}
      />
    </Tabs>
  );
}
