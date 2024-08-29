import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#f8f9fb',
        color: '#1e1f23',
      },
      a: {
        color: '#1e1f23',
        _hover: {
          textDecoration: 'underline',
        },
      },
      h1: {
        color: '#1e1f23',
      },
      h2: {
        color: '#1e1f23',
      },
      p: {
        color: '#1e1f23',
      },
    },
  },
});

export default theme;
