import { Link, Stack } from 'expo-router';
import { View, Text, ActivityIndicator, FlatList, Pressable } from 'react-native';

import { useMyOrderList } from '~/api/orders';
import OrderListItem from '~/components/OrderListItem';

export default function OrdersPage() {
  const { data: myOrders, isLoading, error } = useMyOrderList();

  if (isLoading)
    return (
      <>
        <Stack.Screen options={{ title: 'Orders' }} />
        <ActivityIndicator
          className="flex-1 items-center justify-center"
          size="large"
          color="#0000ff"
        />
      </>
    );

  if (error) return <Text>Error: {error.message}</Text>;

  // 1. User not logged in..

  if (myOrders === null) {
    return (
      <View className="m-6 items-center rounded-lg border border-gray-700 px-4 py-2">
        <Link href="/modal">
          <Text className="text-xl font-bold text-gray-900">Log In to view your orders...</Text>
        </Link>
      </View>
    );
  }

  // No orders placed yet

  if (myOrders?.length === 0) {
    return (
      <View className="mt-10 items-center justify-center gap-3">
        <Text className='font-bold text-2xl text-slate-800'>No Orders Yet..</Text>
        <Text className='font-semibold text-lg text-slate-800'>Visit Our Menu to Place your first order with us..!</Text>
        <Link href={'/(user)/menu'}>
          <Text className='text-base font-normal text-slate-800'>Menu</Text>
        </Link>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Orders' }} />
      <FlatList
        contentContainerStyle={{ gap: 6, marginVertical: 10, marginHorizontal: 6 }}
        data={myOrders}
        renderItem={({ item, index }) => <OrderListItem order={item} statusText='View Details'/>}
      />
    </>
  );
}
