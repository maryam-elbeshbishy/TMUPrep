import React, { useEffect, useState } from 'react'
import Course from '../../components/Course'
import { Box, Flex, Input } from '@chakra-ui/react'
import { getCourses } from '../../services/courses'
import Pagination from '../../components/Pagination'

interface CourseType {
    courseCode: string
    title: string
    description: string
    prerequisites: string[]
    antirequisites: string[]
}

const CourseHub = () => {
    const [courses, setCourses] = useState<CourseType[]>([])
    const [currPage, setCurrPage] = useState<number>(1)
    const [pages, setPages] = useState<number>(0)
    const [search, setSearch] = useState<string>('')

    const fetchData = async (limit: number, page: number, search: string) => {
        const courseData = await getCourses(limit, page, search)
        setCourses(courseData['courses'] ? courseData['courses'] : [])
        setPages(courseData['numberOfPages'])
    }

    useEffect(() => {
        fetchData(5, 1, '')
    }, [])

    const onPageChange = (page: number) => {
        if (page < 1 || page > pages) return
        setCurrPage(page)
        fetchData(5, page, search)
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        fetchData(5, 1, search)
    }

    return (
        <Flex flexDir="column" bg="surface.dark" w="100vw" h="100vh" pt="80px">
            <Flex flexDir="column" bg="secondary.main" p="15px 10px">
                <form onSubmit={handleSubmit}>
                    <Input
                        placeholder="Type here for a course..."
                        size="lg"
                        bg="background"
                        borderRadius="15px"
                        onChange={handleSearchChange}
                    />
                </form>
            </Flex>
            <Box
                bg="surface.main"
                borderRadius="20px"
                mt="10px"
                mb="20px"
                mx="10px"
                p="30px 25px"
                pb="10px"
                h="100%"
                overflowY="scroll"
            >
                <Flex flexDir="column" gap="20px" mb="25px">
                    {courses.map((course, i) => {
                        return (
                            <Course
                                key={i}
                                courseCode={course.courseCode}
                                courseName={course.title}
                                courseDesc={course.description}
                                coursePrereqs={course.prerequisites}
                                courseAntireqs={course.antirequisites}
                            />
                        )
                    })}
                </Flex>
                <Box display="block" position="relative" bottom="0">
                    <Flex justifyContent="center">
                        <Pagination
                            currentPage={currPage}
                            totalPages={pages}
                            onPageChange={onPageChange}
                        />
                    </Flex>
                </Box>
            </Box>
        </Flex>
    )
}

export default CourseHub
