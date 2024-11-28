import AntDesign from '@expo/vector-icons/AntDesign';
import { Link, useRouter } from 'expo-router';
import { View, Text, FlatList, Pressable, Alert } from 'react-native';
import { useAuth } from '~/Providers/AuthProvider';

import { useCart } from '~/Providers/CartProvider';
import CartListItem from '~/components/CartListItem';

const CartScreen = () => {
  const { items, checkout, total } = useCart();
  const { session } = useAuth()

  const handleCheckout = () => {
    if (session) {
      checkout()
    } else {
      router.push('/modal')
    }
  }

  const router = useRouter()

  

  if (items.length === 0) {
    return (
      <View className="mx-auto mt-6 justify-center gap-4 rounded-lg border border-slate-700 bg-white px-8 py-6">
        <Text className="text-2xl font-bold text-red-900">OOps! Your Cart is empty...</Text>
        <Link href="/menu">
          <View className="flex-row items-center gap-0">
            <Text className="mr-3 text-lg font-medium text-red-900">Visit Menu</Text>
            <AntDesign name="arrowright" size={20} color="black" />
          </View>
        </Link>
      </View>
    );
  }

  return (
    <>
      <FlatList
        contentContainerStyle={{ gap: 2, padding: 10 }}
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
      />

      <View className="flex flex-row items-center justify-between p-2">
        <Text className="text-xl font-extrabold text-slate-950">Total: $ {total}</Text>
        <Pressable onPress={handleCheckout}>
          <View className="mb-2 mt-2 items-center rounded-lg border border-slate-500 bg-red-500 pb-2 pl-4 pr-4 pt-2">
            <Text className="text-lg font-medium text-white">Checkout</Text>
          </View>
        </Pressable>
      </View>
    </>
  );
};

export default CartScreen;
