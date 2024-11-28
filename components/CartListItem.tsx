import { View, Text, Pressable, Image } from 'react-native';

import { useCart } from '~/Providers/CartProvider';
import { CartItem } from '~/types';

type CartItemProps = {
  cartItem: CartItem;
};

const CartListItem = ({ cartItem }: CartItemProps) => {
  const { updateQuantity } = useCart();

  return (
    <View className="flex-row justify-between rounded-md border border-slate-500 bg-white p-2">
      <View className="flex-col gap-1">
        <Text className="text-base font-semibold text-slate-900">{cartItem.product.name}</Text>
        <Text className="text-sm font-normal text-slate-700">Price: ${cartItem.product.price}</Text>
        <Text className="text-base font-semibold text-slate-700">Qty: {cartItem.quantity}</Text>
        <View className="flex-row gap-4">
          <Pressable onPress={() => updateQuantity(cartItem.id, 1)}>
            <View>
              <Text className="text-lg font-bold">+</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => updateQuantity(cartItem.id, -1)}>
            <View>
              <Text className="text-lg font-bold">-</Text>
            </View>
          </Pressable>
        </View>
      </View>
      <View className="flex-row gap-1">
        {cartItem.product.image && (
          <Image
            source={{ uri: cartItem.product.image }}
            style={{ width: 90, aspectRatio: 1 }}
            className="rounded-md"
          />
        )}
      </View>
    </View>
  );
};

export default CartListItem;
