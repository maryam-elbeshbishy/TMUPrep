import React from 'react'
import Course from '../../components/Course'
import { Box, Flex, Input, Text } from '@chakra-ui/react'

const CourseHub = () => {
    return (
        <Flex bg="surface.dark" w="100vw" h="100vh" pt="80px">
            <Flex
                flexDir="column"
                bg="secondary.main"
                p="15px 10px"
                flexGrow="1"
            >
                <Input
                    placeholder="Type here for a course..."
                    size="lg"
                    bg="background"
                    borderRadius="15px"
                    mb="60px"
                />
                <Flex
                    flexDir="column"
                    justifyContent="center"
                    alignItems="center"
                    h="80%"
                    p="20px"
                    border="1px solid black"
                >
                    Filters Placeholder
                </Flex>
            </Flex>
            <Box
                bg="surface.main"
                borderRadius="20px"
                w="70%"
                mt="5px"
                mb="20px"
                mx="10px"
                p="40px 25px"
            >
                <Text textAlign="left" fontSize="lg" pb="40px" ml="5px">
                    Selected filters:
                </Text>
                <Course
                    courseCode="CPS109"
                    courseName="Computer Science I"
                    courseDesc=" An introductory programming course designed to introduce fundamental Computer Science concepts such as abstraction, modelling and algorithm design. Emphasis is placed on producing correct software. Replaces CPS 513"
                />
            </Box>
        </Flex>
    )
}

export default CourseHub
