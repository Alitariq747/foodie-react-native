import { useQueryClient } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';

import { useAdminOrderList } from '~/api/orders';
import OrderListItem from '~/components/OrderListItem';
import { supabase } from '~/utils/supabase';

export default function OrdersPage() {
  const { data: orders, isLoading, isError, error } = useAdminOrderList();

  const queryClient = useQueryClient()

  useEffect(() => {

const ordersSubscription = supabase
  .channel('custom-insert-channel')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, (payload) => {
    console.log('Change received!', payload);
    queryClient.invalidateQueries({queryKey: ['orders']})

  })
  .subscribe();
    return () => {
      ordersSubscription.unsubscribe()
    }
  }, [])

  if (isLoading)
    return (
      <ActivityIndicator
        className="flex-1 items-center justify-center"
        size="large"
        color="#0000ff"
      />
    );
  if (isError) return <Text>Error: {error.message}</Text>;

  return (
    <>
      <Stack.Screen options={{ title: 'Orders' }} />
      <View className="">
        <FlatList
          contentContainerStyle={{ gap: 10, padding: 10, marginTop: 10 }}
          data={orders}
          renderItem={({ item }) => <OrderListItem order={item} statusText='View Details'/>}
        />
      </View>
    </>
  );
}
