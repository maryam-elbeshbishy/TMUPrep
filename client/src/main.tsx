import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { GlobalContextProvider } from './contexts/GlobalContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ChakraProvider>
        <GlobalContextProvider>
            <App />
        </GlobalContextProvider>
    </ChakraProvider>
)
