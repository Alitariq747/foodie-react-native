import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { InsertProduct, Product } from '~/types';
import { supabase } from '~/utils/supabase';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
};

export const useProduct = (id: number) => {
  return useQuery<Product, Error>({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
      if (error) {
        throw new Error(error.message);
      }

      return data as Product;
    },
  });
};

export const useDeleteProduct = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn() {
      const { error } = await supabase.from('products').delete().eq('id', id);

      if (error) {
        throw new Error(error.message);
      }

      console.log('deleted');
      return id;
    },
    async onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useInsertProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: InsertProduct) {
      const { data: product, error } = await supabase
        .from('products')
        .insert({ ...data })
        .select()
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return product;
    },
    async onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
