import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useAuth } from '~/Providers/AuthProvider';
import { InsertOrder, InsertOrderItems, UpdateOrder } from '~/types';
import { supabase } from '~/utils/supabase';

export const useAdminOrderList = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data, error } = await supabase.from('orders').select('*');
      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
};

export const useMyOrderList = () => {
  const { session } = useAuth();
  const id = session?.user.id;

  return useQuery({
    queryKey: ['orders', { userId: id }],
    queryFn: async () => {
      if (!id) {
        return null;
      }
      const { data, error } = await supabase.from('orders').select('*').eq('user_id', id);
      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
};

export const useInsertOrder = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const userId = session?.user.id;

  return useMutation({
    async mutationFn(data: InsertOrder) {
      const { data: newOrder, error } = await supabase
        .from('orders')
        .insert({
          ...data,
          user_id: userId,
        })
        .select()
        .single();
      if (error) {
        throw new Error(error.message);
      }

      return newOrder;
    },
    async onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

export const useInsertOrderItems = () => {
  return useMutation({
    async mutationFn(items: InsertOrderItems[]) {
      const { error, data: orderitems } = await supabase.from('orderitems').insert(items).select();
      if (error) {
        throw new Error(error.message);
      }

      return orderitems;
    },
  });
};

export const useOrderDetails = (id: number) => {
  return useQuery({
    queryKey: ['orders', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*, orderitems(*, products(*))')
        .eq('id', id)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn({ id, updatedFields }: { id: number; updatedFields: UpdateOrder }) {
      const { data: updatedOrder, error } = await supabase
        .from('orders')
        .update(updatedFields)
        .eq('id', id)
        .select()
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return updatedOrder;
    },
    async onSuccess(_, { id }) {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['orders', id] });
    },
  });
};
