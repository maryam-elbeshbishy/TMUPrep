import { Box, VStack, Input } from '@chakra-ui/react'
import CourseSearchOption from './CourseSearchOptions.tsx'
import Pagination from '../../../components/Pagination.tsx'
import Cookies from 'universal-cookie'
import axios from 'axios'
import { useState, useEffect } from 'react'

interface CourseType {
    courseCode: string
    title: string
    description: string
    prerequisites: string[]
    antirequisites: string[]
}

const Sidebar = () => {
    const cookies = new Cookies()
    const [courses, setCourses] = useState<CourseType[]>([])
    const [search] = useState<string>('')
    const [page, setPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(0)
    const [limit] = useState<number>(10)
    useEffect(() => {
        // Fetch courses from the endpoint
        axios
            .get(
                `http://localhost:8080/course?limit=${limit}&page=${page}&search=${search}`,
                {
                    headers: {
                        Authorization: cookies.get('jwt'),
                    },
                },
            )
            .then(response => {
                setCourses(response.data.courses)
                setTotalPages(response.data.numberOfPages)
            })
            .catch(error => {
                console.error('Error fetching courses:', error)
            })
    }, [page, search])
    const displayCourses = () => {
        return courses.map(course => {
            return (
                <CourseSearchOption
                    key={course.courseCode}
                    code={course.courseCode}
                    name={course.title}
                    description={course.description}
                    prereqs={course.prerequisites}
                    antireqs={course.antirequisites}
                />
            )
        })
    }

    return (
        <Box bg="secondary.main" w="30%" h="100%" overflowY="auto" p="20px">
            <VStack spacing="20px">
                <Input
                    bg="surface.main"
                    border="none"
                    borderRadius="10px"
                    type="text"
                    placeholder="Type here for a course..."
                />

                {displayCourses()}

                <Pagination
                    totalPages={totalPages}
                    currentPage={page}
                    onPageChange={setPage}
                />
            </VStack>
        </Box>
    )
}

export default Sidebar
