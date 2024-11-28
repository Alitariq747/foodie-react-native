import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, Pressable } from 'react-native';

import { useOrderDetails, useUpdateOrderStatus } from '~/api/orders';
import OrderItemsListItem from '~/components/OrderItemsListItem';
import OrderListItem from '~/components/OrderListItem';
import { OrderStatus } from '~/types';

const SignleOrderPageAdmin = () => {
  const { id: idString } = useLocalSearchParams();

  const router = useRouter();

  const idNumber = parseFloat(typeof idString === 'string' ? idString : idString[0]);

  const { data: order, isLoading, isError, error } = useOrderDetails(idNumber);

  const { mutate: updateStatus } = useUpdateOrderStatus();

  const [status, setStatus] = useState(isLoading ? '' : order?.status);

  const handleUpdateStatus = async (status: string) => {
    setStatus(status);
    await updateStatus(
      { id: idNumber, updatedFields: { status } },
      {
        async onSuccess() {
          router.back();
        },
      }
    );
  };

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
  if (isError) return <Text>Error: {error.message}</Text>;

  return (
    <>
      <Stack.Screen options={{ title: `Order# ${idString}` }} />
      <View className="p-4">
        {order && (
          <FlatList
            contentContainerStyle={{ gap: 6 }}
            data={order?.orderitems}
            renderItem={({ item }) => <OrderItemsListItem item={item} />}
            ListHeaderComponent={<OrderListItem order={order} statusText={order.status} />}
            ListFooterComponent={() => (
              <>
                <FlatList
                  data={OrderStatus}
                  numColumns={4}
                  contentContainerStyle={{ gap: 4 }}
                  columnWrapperStyle={{ gap: 5 }}
                  renderItem={({ item }) => (
                    <Pressable onPress={() => handleUpdateStatus(item)}>
                      <View
                        className={` ${status === item ? 'bg-blue-600' : 'bg-white'} justify-center rounded-lg border border-blue-950 px-4 py-2`}>
                        <Text className="font-normal text-blue-950">{item}</Text>
                      </View>
                    </Pressable>
                  )}
                />
              </>
            )}
          />
        )}
      </View>
    </>
  );
};

export default SignleOrderPageAdmin;
