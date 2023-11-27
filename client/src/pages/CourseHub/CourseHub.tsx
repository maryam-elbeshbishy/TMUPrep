import React, { useEffect, useState } from 'react'
import Course from '../../components/Course'
import { Box, Flex, Input, Text } from '@chakra-ui/react'
import { getCourses } from '../../services/courses'

interface CourseType {
    courseCode: string
    title: string
    description: string
}

const CourseHub = () => {
    const [courses, setCourses] = useState<CourseType[]>([])
    // const [currPage, setCurrPage] = useState<number>(1)
    // const [pages, setPages] = useState<number>(0)

    useEffect(() => {
        const fetchData = async () => {
            const courseData = await getCourses(5, 1, '')
            setCourses(courseData['courses'])
            // setPages(courseData["numberOfPages"])
        }

        fetchData()
    }, [])

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
                mt="10px"
                mb="20px"
                mx="10px"
                p="40px 25px"
            >
                <Text textAlign="left" fontSize="lg" pb="40px" ml="5px">
                    Selected filters:
                </Text>
                <Flex flexDir="column" h="90%">
                    <Box flexGrow="1" overflowY="scroll" h="1px">
                        <Flex flexDir="column" gap="20px">
                            {courses.map(course => {
                                return (
                                    <Course
                                        courseCode={course.courseCode}
                                        courseName={course.title}
                                        courseDesc={course.description}
                                    />
                                )
                            })}
                        </Flex>
                    </Box>
                </Flex>
            </Box>
        </Flex>
    )
}

export default CourseHub
