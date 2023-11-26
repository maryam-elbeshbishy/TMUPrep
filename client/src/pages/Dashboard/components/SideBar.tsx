import { Box, VStack, Input } from '@chakra-ui/react'
import CourseSearchOption from './CourseSearchOptions.tsx'
import Cookies from 'universal-cookie'
import axios from 'axios'
import { useState, useEffect } from 'react'

const Sidebar = () => {
    const cookies = new Cookies()
    const [courses, setCourses] = useState([])
    useEffect(() => {
        // Fetch courses from the endpoint
        axios
            .get('http://localhost:8080/course?limit=10&page=1', {
                headers: {
                    Authorization: cookies.get('jwt'),
                },
            })
            .then(response => {
                setCourses(response.data.courses)
            })
            .catch(error => {
                console.error('Error fetching courses:', error)
            })
    }, [])
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
            </VStack>
        </Box>
    )
}

export default Sidebar
