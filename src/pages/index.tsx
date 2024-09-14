import { HomeContainer, Product } from '@/style/pages/home';
import { useKeenSlider } from 'keen-slider/react';

import { stripe } from '@/lib/stripe';
import { GetServerSideProps } from 'next';

import Image from 'next/image';

import 'keen-slider/keen-slider.min.css';

import Head from 'next/head';

import Stripe from 'stripe';
import CartButton from '@/components/CartButton';
import { useCart } from '@/hooks/useCart';
import { IProduct } from '@/contexts/CartContexts';
import { MouseEvent } from 'react';

interface HomeProps {
  products: IProduct[];
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  const { addToCart, checkIfItemAlreadyExists } = useCart();

  function handleAddToCart(
    e: MouseEvent<HTMLButtonElement>,
    product: IProduct
  ) {
    e.preventDefault();
    addToCart(product);
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => (
          <Product
            prefetch={false}
            href={`/product/${product.id}`}
            className="keen-slider__slide"
            key={product.id}
          >
            <Image
              src={product.imageurl}
              width={520}
              height={480}
              alt="imagem de uma camiseta"
            />

            <footer>
              <div>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
              </div>

              <CartButton
                color="green"
                size="large"
                disabled={checkIfItemAlreadyExists(product.id)}
                onClick={(e) => handleAddToCart(e, product)}
              />
            </footer>
          </Product>
        ))}
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetServerSideProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageurl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount! / 100),
      numberPrice: price.unit_amount / 100,
      defaultPriceID: price.id,
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2hours
  };
};
