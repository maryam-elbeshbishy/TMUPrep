import React from 'react'
import { Box, Flex, Text, Button, Card } from '@chakra-ui/react'

type CourseProps = {
    courseCode: string
    courseName?: string
    dropCourse: () => void
}

function DashboardCourse({ courseCode, courseName, dropCourse }: CourseProps) {
    return (
        <Box
            boxShadow="0 3px 0 rgba(255, 208, 207, 1)"
            bg="surface.main"
            borderRadius="20px"
            py="10px"
            px="15px"
            // align='center'
        >
            <Flex direction="row" alignItems="center" justifyContent="space-between">
                <Box bg="surface.main" borderRadius="20px">
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
                    m="10px"
                    backgroundColor="success"
                    alignSelf="end"
                >
                    <Text>X</Text>
                </Button>
            </Flex>
        </Box>
    )
}
export default DashboardCourse
