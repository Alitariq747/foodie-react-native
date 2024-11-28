import { Tables, Database } from './database.types';

export type Product = Tables<'products'>;
export type Profile = Tables<'profiles'>;
export type Order = Tables<'orders'>;
export type OrderItem = Tables<'orderitems'>;

export type InsertOrder = Database['public']['Tables']['orders']['Insert'];
export type UpdateOrder = Database['public']['Tables']['orders']['Update']
export type InsertOrderItems = Database['public']['Tables']['orderitems']['Insert']
export type InsertProfile = Database['public']['Tables']['profiles']['Insert']
export type InsertProduct = Database['public']['Tables']['products']['Insert']

export type CartItem = {
  id: string;
  product: Product;
  quantity: number;
  productId: number;
};

export const  OrderStatus = ['New', 'Cooking', 'Dispatched', 'Completed']
