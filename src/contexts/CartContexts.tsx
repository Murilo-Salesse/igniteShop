import { createContext, useState } from 'react';

export interface IProduct {
  id: string;
  name: string;
  imageurl: string;
  price: string;
  numberPrice: number;
  description: string;
  defaultPriceID: string;
}

interface CartContextData {
  cartItems: IProduct[];
  cartTotal: number;
  addToCart: (product: IProduct) => void;
  removeCartItem: (productId: string) => void;
  checkIfItemAlreadyExists: (product: string) => boolean;
}

interface CartContextProviderProps {
  children: React.ReactNode;
}

export const CartContext = createContext({} as CartContextData);

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartItems, setCartItems] = useState<IProduct[]>([]);

  const cartTotal = cartItems.reduce((total, product) => {
    return total + product.numberPrice;
  }, 0);

  function addToCart(product: IProduct) {
    setCartItems((state) => [...state, product]);
  }

  function removeCartItem(productId: string) {
    setCartItems((state) => state.filter((item) => item.id !== productId));
  }

  function checkIfItemAlreadyExists(productId: string) {
    return cartItems.some((product) => product.id === productId);
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeCartItem,
        cartTotal,
        checkIfItemAlreadyExists,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
