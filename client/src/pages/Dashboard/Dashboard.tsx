import { Box, Flex } from '@chakra-ui/react'
import Schedule from './components/Schedule'
import DashboardCourse from '../../components/DashboardCourse'
import Sidebar from './components/SideBar.tsx'

const Dashboard = () => {
    return (
        <Box bg="surface.dark" w="100vw" h="100vh" pt="80px">
            <DashboardCourse
                courseCode="CPS109"
                courseName="Computer Science I"
                dropCourse={() => {}}
            />
            <Flex flexDir="row" h="100%" gap="40px">
                <Sidebar />
                <Schedule />
            </Flex>
        </Box>
    )
}

export default Dashboard
