import { Box, Flex } from '@chakra-ui/react'
import Schedule from './components/Schedule'
import Sidebar from './components/SideBar'

const Dashboard = () => {
    return (
        <Box bg="surface.dark" w="100vw" h="100vh" pt="80px">
            <Flex direction={{base: "column", lg: "row"}} h="100%" gap="40px">
                <Flex minHeight={{base: "50vh", lg:"none"}} w={{base: "100%", lg: "30%"}}>
                <Sidebar />
                    
                </Flex>
                <Schedule />
            </Flex>
        </Box>
    )
}

export default Dashboard
