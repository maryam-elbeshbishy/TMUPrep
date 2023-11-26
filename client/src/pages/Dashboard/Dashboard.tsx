import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import Schedule from './components/Schedule'

const Dashboard = () => {
    return (
        <Box bg="surface.dark" w="100vw" h="100vh" pt="80px">
            <Flex flexDir="row" h="100%" gap="40px">
                <Box width="30%" bg="secondary.main">
                    Placeholder
                </Box>
                <Schedule />
            </Flex>
        </Box>
    )
}

export default Dashboard
