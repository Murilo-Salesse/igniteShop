import { CartContext } from '@/contexts/CartContexts';
import { useContext } from 'react';

export function useCart() {
  return useContext(CartContext);
}
