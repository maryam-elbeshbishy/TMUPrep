import { Box, Flex } from '@chakra-ui/react'
import Schedule from './components/Schedule'
import Sidebar from './components/SideBar'

const Dashboard = () => {
    return (
        <Box bg="surface.dark" w="100vw" h="100vh" pt="80px">
            <Flex flexDir="row" h="100%" gap="40px" flexWrap="wrap">
                <Sidebar />
                <Schedule />
            </Flex>
        </Box>
    )
}

export default Dashboard
