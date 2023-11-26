import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { GlobalContextProvider } from './contexts/GlobalContext.tsx'

const customTheme = extendTheme({
    colors: {
        primary: {
            main: '#648DE6',
            dark: '#004C9B',
        },
        secondary: {
            main: '#FFECA8',
            dark: '#FFDC00',
        },
        accent: {
            main: '#4D6285',
            light: '#454654',
            dark: '#97A4B9',
        },
        surface: {
            main: '#FFFAF2',
            dark: '#EBE5DB',
        },
        background: '#FFFEFD',
        success: '#B0CBA3',
        error: '#FFD0CF',
    },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ChakraProvider theme={customTheme}>
        <GlobalContextProvider>
            <App />
        </GlobalContextProvider>
    </ChakraProvider>,
)
