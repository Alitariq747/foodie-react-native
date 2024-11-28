import { randomUUID } from 'expo-crypto';
import { useRouter } from 'expo-router';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

import { useInsertOrder, useInsertOrderItems } from '~/api/orders';
import { CartItem, InsertOrder, Order, Product } from '~/types';
import { useAuth } from './AuthProvider';
import { Alert } from 'react-native';

type CartType = {
  items: CartItem[];
  addItem: (product: Product) => void;
  updateQuantity: (itemId: string, amount: 1 | -1) => void;
  checkout: () => void;
  total: number;
  clearCart: () => void;
};

export const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  checkout: () => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const router = useRouter();

  const { mutateAsync: insertOrder } = useInsertOrder();
  const { mutateAsync: insertOrderItems } = useInsertOrderItems();

  const { session } = useAuth();
  const userId = session?.user.id;

  const addItem = (product: Product) => {
    // check if item already exists in cart

    const existingItem = items.find((item) => item.product === product);

    if (existingItem) {
      // call updateQuantity function
      updateQuantity(existingItem.id, 1);
      return;
    }

    const newCartItem: CartItem = {
      id: randomUUID(),
      product,
      quantity: 1,
      productId: product.id,
    };

    setItems((prevItems) => [...prevItems, newCartItem]);
  };

  const updateQuantity = (itemId: string, amount: 1 | -1) => {
    setItems((currentItems) => {
      return currentItems
        .map((item) => {
          if (item.id === itemId) {
            const newQuantity = item.quantity + amount;
            return {
              ...item,
              quantity: newQuantity > 0 ? newQuantity : 0, // Ensure quantity doesn't go below 0
            };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  const total = items.reduce((sum, item) => (sum += item.product.price * item.quantity), 0);

  const checkout = async () => {
    try {
      const order = await insertOrder({ total, user_id: userId });
      const orderItems = items.map((item) => ({
        order_id: order.id,
        price: item.product.price,
        product_id: item.product.id,
        quantity: item.quantity,
      }));
      insertOrderItems(orderItems, {
        onSuccess: () => {
          clearCart();
          router.push(`/(user)/orders/${order.id}`);
        },
      });
    } catch (error) {
      console.log('Error creating order...');
    }
  };

  const clearCart = () => {
    setItems([]);
  };
  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, total, checkout, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
