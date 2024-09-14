import { styled } from '@stitches/react';
import * as Dialog from '@radix-ui/react-dialog';

export const CartContent = styled(Dialog.Content, {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,

  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',

  boxShadow: '-4px 0px 30px rgba(0, 0, 0, 0.8)',

  width: '30rem',
  padding: '2rem',

  background: '$gray800',

  '> section': {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    flex: 1,
    overflowY: 'auto',
  },
});

export const CartClose = styled(Dialog.Close, {
  display: 'flex',
  justifyContent: 'flex-end',

  background: 'transparent',
  border: 0,

  cursor: 'pointer',

  color: '$gray300',
});

export const CartProduct = styled('div', {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: '1.25rem',
  height: '5.8125rem',
});

export const CartProductImage = styled('div', {
  widows: '6.3125rem',
  height: '5.8125rem',
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%);',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 8,

  img: {
    objectFit: 'cover',
  },
});

export const CardProductDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',

  p: {
    color: '$gray300',
    fontSize: '$md',
  },

  strong: {
    marginTop: 4,
    fontSize: '$md',
    fontWeight: 700,
  },

  button: {
    marginTop: 'auto',
    color: '$green500',
    background: 'none',
    fontSize: '1rem',
    border: 'none',
    cursor: 'pointer',
  },
});

export const CartFinalization = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  marginTop: 'auto',

  button: {
    width: '100%',
    background: '$green500',
    color: '$white',
    fontSize: '$md',
    height: '4.3125rem',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: 700,

    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },

    '&:not(:disabled):hover': {
      background: '$green300',
    },
  },
});

export const FinalizationDeatils = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,

  marginBottom: 55,

  div: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    p: {
      fontSize: '$md',
      color: '$gray300',
    },

    '&:last-child': {
      fontWeight: 'bold',

      span: {
        fontSize: '$md',
      },

      p: {
        fontSize: '$xl',
        color: '$gray100',
      },
    },
  },
});
