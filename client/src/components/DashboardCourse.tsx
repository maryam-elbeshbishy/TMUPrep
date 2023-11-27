import React from 'react'
import { Box, Flex, Text, Button, Card } from '@chakra-ui/react'

type CourseProps = {
    courseCode: string
    courseName: string
    dropCourse: () => void
}

function DashboardCourse({ courseCode, courseName, dropCourse }: CourseProps) {
    return (
        <Flex>
            <Card
                boxShadow="0 3px 0 rgba(255, 208, 207, 1)"
                bg="surface.main"
                borderRadius="20px"
            >
                <Flex direction="row" align="center">
                    <Box bg="surface.main" p="5px 20px" borderRadius="20px">
                        <Text textAlign="left" fontWeight="bold">
                            {courseCode}
                        </Text>
                        <Text>{courseName}</Text>
                    </Box>
                    <Button
                        onClick={dropCourse}
                        bg="surface.main"
                        aria-label={''}
                        borderRadius="20px"
                    >
                        <Text>X</Text>
                    </Button>
                </Flex>
            </Card>
        </Flex>
    )
}
export default DashboardCourse
