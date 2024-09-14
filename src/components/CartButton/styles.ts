import { styled } from '@stitches/react';

export const CartButtonContainer = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  padding: '1rem',
  cursor: 'pointer',

  borderRadius: 6,

  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },

  variants: {
    color: {
      gray: {
        background: '$gray800',
        color: '$gray500',
      },

      green: {
        background: '$green500',
        color: '$white',
      },
    },

    size: {
      medium: {
        height: '3rem',
        width: '3rem',

        svg: {
          fontSize: 24,
        },
      },

      large: {
        height: '3.5rem',
        width: '3.5rem',

        svg: {
          fontSize: 32,
        },
      },
    },
  },

  defaultVariants: {
    color: 'gray',
    size: 'medium',
  },
});
