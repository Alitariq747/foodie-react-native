import { useQueryClient } from '@tanstack/react-query';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

import { useOrderDetails } from '~/api/orders';
import OrderItemsListItem from '~/components/OrderItemsListItem';
import OrderListItem from '~/components/OrderListItem';
import { supabase } from '~/utils/supabase';

const SingleOrderPage = () => {
  const { id: idString } = useLocalSearchParams();

  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);

  const { data: orderDetail, isLoading, error } = useOrderDetails(id);

  const queryClient = useQueryClient();

  useEffect(() => {
    const updateSubscription = supabase
      .channel('custom-update-channel')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'orders' }, (payload) => {
        console.log('Change received!', payload);

        queryClient.invalidateQueries({ queryKey: ['orders', id] });
      })
      .subscribe();
    return () => {
      updateSubscription.unsubscribe();
    };
  }, []);

  if (isLoading)
    return (
      <>
        <Stack.Screen options={{ title: '...' }} />
        <ActivityIndicator
          className="flex-1 items-center justify-center"
          size="large"
          color="#0000ff"
        />
      </>
    );

  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <>
      <Stack.Screen options={{ title: `Order# ${id}` }} />
      <View className="gap-3 p-4">
        <Text className="text-center text-2xl font-extrabold text-slate-700">Order Details</Text>
        {orderDetail && (
          <FlatList
            data={orderDetail.orderitems}
            contentContainerStyle={{ gap: 4 }}
            renderItem={({ item }) => <OrderItemsListItem item={item} />}
            ListHeaderComponent={
              <OrderListItem order={orderDetail} statusText={orderDetail.status} />
            }
          />
        )}
      </View>
    </>
  );
};

export default SingleOrderPage;
