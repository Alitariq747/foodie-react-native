import { AntDesign } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs, useRouter } from 'expo-router';
import { Pressable } from 'react-native';

import UserHeaderButton from '~/components/UserHeaderButton';

export default function TabLayout() {
  const router = useRouter();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
        headerRight: () => (
          <Pressable onPress={() => router.push('/modal')}>
            <AntDesign name="user" size={24} color="black" style={{ marginRight: 10 }} />
          </Pressable>
        ),
      }}>
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons name="menu-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons name="receipt-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          tabBarIcon: ({ color }) => <Ionicons name="create-outline" size={24} color="black" />,
          headerRight: () => <UserHeaderButton />,
        }}
      />
    </Tabs>
  );
}
