import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';

import Header from './Components/Header.jsx'
import Todos from './Components/Todos.jsx'

function App() {
  return(
    <ChakraProvider>
      <Header></Header>
      <Todos></Todos>
    </ChakraProvider>
  )
}

const rootElement = createRoot(document.getElementById('root'));
rootElement.render(<App></App>)