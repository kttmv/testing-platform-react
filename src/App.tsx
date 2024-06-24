import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import { exampleTest } from './exampleTest'
import { Testing } from './Testing'

function App() {
    return (
        <React.StrictMode>
            <ChakraProvider>
                <Testing test={exampleTest} />
            </ChakraProvider>
        </React.StrictMode>
    )
}

export default App
