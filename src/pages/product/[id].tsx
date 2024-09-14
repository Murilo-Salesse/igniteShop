import { IProduct } from '@/contexts/CartContexts';
import { useCart } from '@/hooks/useCart';
import { stripe } from '@/lib/stripe';
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '@/style/pages/product';

import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Stripe from 'stripe';

interface ProductProps {
  product: IProduct;
}

export default function Product({ product }: ProductProps) {
  //isFallback verifica se o produto ja fez a request pra API e foi carregado
  const { isFallback } = useRouter();

  const { addToCart, checkIfItemAlreadyExists } = useCart();

  if (isFallback) {
    return <div>Loading...</div>;
  }

  const itemAlreadyInCart = checkIfItemAlreadyExists(product.id);

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageurl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button
            onClick={() => addToCart(product)}
            disabled={itemAlreadyInCart}
          >
            {itemAlreadyInCart
              ? 'Produto já está no carrinho'
              : 'Colocar na sacola'}
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: 'prod_Qo4l40WpSGU2df' } }],
    fallback: true,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productID = params.id;

  const product = await stripe.products.retrieve(productID, {
    expand: ['default_price'],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageurl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount! / 100),
        description: product.description,
        defaultPriceID: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour in cache
  };
};
