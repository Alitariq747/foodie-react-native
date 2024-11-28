import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Link, useSegments } from 'expo-router';
import { View, Text, Pressable } from 'react-native';

import { Order } from '~/types';

dayjs.extend(relativeTime);

type OrderListItemProps = {
  order: Order;
  statusText: string;
};

const OrderListItem = ({ order, statusText }: OrderListItemProps) => {
  const segments = useSegments();

  return (
    <Link href={`/${segments[0]}/orders/${order.id}`} asChild>
      <Pressable>
        <View className="flex-row items-center justify-between rounded-md border border-slate-700 bg-white p-3">
          <View className="gap-1">
            <Text className="text-lg font-bold text-slate-900">Order# {order.id}</Text>
            <Text className="text-base font-light text-slate-900">
              Order placed: {dayjs(order.created_at).fromNow()}
            </Text>
          </View>
          <View className="gap-1">
            <Text className="text-lg font-bold text-slate-900">{statusText}</Text>
            <Text className="text-base font-light text-slate-900">Total: {order.total}</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

export default OrderListItem;
