'use client';

import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useCart = () => {
  async function fetchCurrentUser() {
    const res = await fetch('/api/me');
    if (!res.ok) throw new Error('Failed to fetch user');
    return res.json();
  }
  const { data } = useQuery({
    queryKey: ['currentUser'],
    queryFn: fetchCurrentUser,
  });

  const sessionUser = data?.session;

  const queryClient = useQueryClient();
  // fetch cart data
  const {
    data: cart,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      // get data from DB
      const res = await fetch('/api/cart/');
      if (!res.ok) throw new Error('Failed to fetch cart');
      return res.json();
    },
    staleTime: 5 * 60 * 1000, // cache for 5 minutes
  });

  // add to cart

  const addToCartMutation = useMutation({
    mutationFn: async (productId: string) => {
      if (!sessionUser) {
        toast.error('Please First Login');
        return (window.location.href = '/login');
      }
      const res = await fetch('/api/cart', {
        method: 'POST',
        body: JSON.stringify({ productId }),
        headers: { 'Content-type': 'application/json' },
      });
      if (!res.ok) throw new Error('Failed to add to cart');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      if (!sessionUser) {
        toast.error('Please First Login');
        return (window.location.href = '/login');
      } else {
        return toast.success('item is added');
      }
    },
    onError: () => {
      toast.error('failed to add');
    },
  });

  const removeCartItemMutation = useMutation({
    mutationFn: async (productId: string) => {
      const res = await fetch('/api/cart', {
        method: 'DELETE',
        body: JSON.stringify({ productId }),
        headers: { 'Content-type': 'application/json' },
      });
      if (!res.ok) throw new Error('Failed to remove from cart');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('item is deleted');
    },
    onError: () => {
      toast.error('failed to remove');
    },
  });

  return { cart, isLoading, error, addToCartMutation, removeCartItemMutation };
};
