import React from 'react'
import Course from '../../components/Course'
import { Box } from '@chakra-ui/react'
const CourseHub = () => {
    return (
        <Box>
            <Course
                courseCode="CPS109"
                courseName="Computer Science I"
                courseDesc=" An introductory programming course designed to introduce fundamental Computer Science concepts such as abstraction, modelling and algorithm design. Emphasis is placed on producing correct software. Replaces CPS 513"
            />
        </Box>
    )
}

export default CourseHub
