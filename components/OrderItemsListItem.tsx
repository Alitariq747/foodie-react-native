import { View, Text, Image } from 'react-native';

import { OrderItem, Product } from '~/types';

type OrderItemListItemProps = {
  item: { products: Product | null } & OrderItem;
};

const OrderItemsListItem = ({ item }: OrderItemListItemProps) => {
  return (
    <View className="flex-row justify-between rounded-lg border border-slate-800 bg-white p-2">
      <View className="flex-col gap-1">
        <Text className="text-base font-bold text-slate-700">{item.products?.name}</Text>
        <Text className="text-sm font-light text-slate-700">Price: ${item.products?.price}</Text>
        <Text className="text-sm font-semibold text-slate-950">Qty: {item.quantity}</Text>
      </View>
      <View>
        {item.products?.image && (
          <Image
            source={{ uri: item.products.image }}
            style={{ width: 70, aspectRatio: 1 }}
            className="rounded-md"
          />
        )}
      </View>
    </View>
  );
};

export default OrderItemsListItem;
