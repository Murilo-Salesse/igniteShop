import { stripe } from '@/lib/stripe';
import {
  ImageContainer,
  ImagesContaienr,
  SuccessContainer,
} from '@/style/pages/success';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import Link from 'next/link';
import Stripe from 'stripe';

interface SuccessProps {
  customerName: string;
  productsImages: string[];
}

export default function Success({
  customerName,
  productsImages,
}: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <ImagesContaienr>
          {productsImages.map((image, i) => {
            return (
              <ImageContainer key={i}>
                <Image src={image} width={120} height={110} alt="" />
              </ImageContainer>
            );
          })}
        </ImagesContaienr>
        <h1>Compra efetuada com sucesso!</h1>
        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de{' '}
          {productsImages.length} camiseta(s) já está a caminho da sua casa.
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const sessionID = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionID, {
    expand: ['line_items', 'line_items.data.price.product'],
  });

  const customerName = session.customer_details.name;
  const productsImages = session.line_items.data.map((item) => {
    const product = item.price.product as Stripe.Product;
    return product.images[0];
  });

  return {
    props: {
      customerName,
      productsImages,
    },
  };
};
