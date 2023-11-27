import React, { useState, useEffect } from 'react'
import { Box, Flex, IconButton, Select, Text } from '@chakra-ui/react'
import { MdPostAdd } from 'react-icons/md'
import { FiTrash2 } from 'react-icons/fi'
import { axiosInstance } from '../../../utils/axios'

const SemTitles = ['Fall', 'Winter', 'Spring']

interface Course {
    _id: string
    courseID: string
    scheduleID: string
    term: number
    year: number
    prerequisites: string[]
    antirequisites: string[]
    userID: string
}

const Schedule = () => {
    let scheduleID: string
    const [courses, setCourses] = useState<Course[]>([])
    const [yearList, setYearList] = useState<number[]>([1, 2, 3, 4])
    const [year, setYear] = useState<number>(1)
    const [termCourses, setTermCourses] = useState<Course[][] | null>([])

    useEffect(() => {
        const getCourses = async () => {
            await axiosInstance.get('/schedule/all').then(res => {
                scheduleID = res.data[0]._id
            })

            if (scheduleID) {
                await axiosInstance
                    .get(`/schedule/${scheduleID}`)
                    .then(res => {
                        setCourses(res.data)
                    })// hi stream
            } else {
                await axiosInstance.post('/schedule/').then(res => {
                    scheduleID = res.data?.scheduleID
                })

                await axiosInstance
                    .get(`/schedule/${scheduleID}`)
                    .then(res => {
                        setCourses(res.data)
                    })
            }
        }

        getCourses()
    }, [])

    useEffect(() => {
        const filteredCourses = courses.filter(
            (course: Course) => course.year == year,
        )

        const termsArray: Course[][] = [
            filteredCourses?.filter((course: Course) => course.term == 1),
            filteredCourses?.filter((course: Course) => course.term == 2),
            filteredCourses?.filter((course: Course) => course.term == 3),
        ]

        setTermCourses(termsArray)
    }, [courses, year])

    useEffect(() => {
        const highestYear = courses.reduce(
            (max, obj) => (obj.year > max ? obj.year : max),
            Number.MIN_SAFE_INTEGER,
        )

        if (highestYear > yearList.length) {
            setYearList(
                Array.from({ length: highestYear }, (_, index) => index + 1),
            )
        }
    }, [courses])

    const changeYear = (e: any) => {
        e?.target && setYear(e.target.value)
    }

    const addYear = () => {
        const newYear = yearList[yearList.length - 1] + 1
        setYearList([...yearList, newYear])
        setYear(newYear)
    }

    return (
        <Box
            borderRadius="20px"
            bg="surface.main"
            w="65%"
            h="98%"
            m="10px"
            p="20px 30px"
        >
            <Flex
                flexDir="row"
                justifyContent="space-between"
                marginBottom="20px"
            >
                <Select
                    placeholder="Select schedule here"
                    w="30%"
                    bg="background"
                    value={year}
                    onChange={changeYear}
                >
                    {yearList.map((y: number) => (
                        <option value={y} key={y}>{`Year ${y}`}</option>
                    ))}
                </Select>
                <Flex gap="30px">
                    <IconButton
                        aria-label="add"
                        bg="none"
                        fontSize="36px"
                        onClick={addYear}
                        icon={<MdPostAdd />}
                    />

                    <IconButton
                        aria-label="trash"
                        bg="none"
                        fontSize="30px"
                        icon={<FiTrash2 />}
                    />
                </Flex>
            </Flex>
            <Flex
                flex="1"
                direction={{ base: 'column', md: 'row' }}
                h="90%"
                justifyContent="space-between"
                overflow="auto"
            >
                {termCourses?.map((term: Course[], index: number) => (
                    <Box
                        key={index}
                        bg="surface.dark" 
                        w={{base: "90%", md:"30%"}} 
                        h={{base: "33%", md:"100%"}}
                        m="10px"
                        borderRadius="20px"
                        overflow="auto"
                    >
                        <Box
                            bg="surface.main"
                            borderRadius="10px"
                            m="20px"
                            h="30px"
                            pt="2px"
                        >
                            <Text fontWeight="800">{SemTitles[index]}</Text>
                            {term?.map((course: Course) => (
                                <Box
                                    key={course._id}
                                    bg="surface.main"
                                    borderRadius="10px"
                                    m="20px"
                                    h="30px"
                                    pt="2px"
                                >
                                    <Text>{course.courseID}</Text>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                ))}
            </Flex>
        </Box>
    )
}

export default Schedule
