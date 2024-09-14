import * as Dialog from '@radix-ui/react-dialog';
import CartButton from '../CartButton';
import {
  CardProductDetails,
  CartClose,
  CartContent,
  CartFinalization,
  CartProduct,
  CartProductImage,
  FinalizationDeatils,
} from './styles';
import { X } from 'phosphor-react';
import Image from 'next/image';

import { useCart } from '@/hooks/useCart';
import { useState } from 'react';
import axios from 'axios';

export default function Cart() {
  const { cartItems, removeCartItem, cartTotal } = useCart();
  const cartQuantity = cartItems.length;

  const formattedCartTotal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(cartTotal);

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  async function handleCheckout() {
    try {
      setIsCreatingCheckoutSession(true);

      const response = await axios.post('/api/checkout', {
        products: cartItems,
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      setIsCreatingCheckoutSession(false);
      alert('Falha ao redirecionar ao checkout');
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <CartButton />
      </Dialog.Trigger>

      <Dialog.Portal>
        <CartContent>
          <CartClose>
            <X size={24} weight="bold" />
          </CartClose>

          <h2>Sacola de compras</h2>

          <section>
            {cartQuantity <= 0 && (
              <p>Parece que seu carrinho de compras está vazio :( </p>
            )}

            {cartItems.map((itemCart) => (
              <CartProduct key={itemCart.id}>
                <CartProductImage>
                  <Image
                    width={100}
                    height={93}
                    alt={itemCart.name}
                    src={itemCart.imageurl}
                  />
                </CartProductImage>

                <CardProductDetails>
                  <p>{itemCart.name}</p>
                  <strong>{itemCart.price}</strong>
                  <button onClick={() => removeCartItem(itemCart.id)}>
                    Remover
                  </button>
                </CardProductDetails>
              </CartProduct>
            ))}
          </section>

          <CartFinalization>
            <FinalizationDeatils>
              <div>
                <span>quantidade</span>
                <p>
                  {cartQuantity} {cartQuantity === 1 ? 'item' : 'itens'}{' '}
                </p>
              </div>

              <div>
                <span>Valor total</span>
                <p>{formattedCartTotal}</p>
              </div>
            </FinalizationDeatils>

            <button
              onClick={handleCheckout}
              disabled={isCreatingCheckoutSession || cartQuantity <= 0}
            >
              Finalizar compra
            </button>
          </CartFinalization>
        </CartContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
