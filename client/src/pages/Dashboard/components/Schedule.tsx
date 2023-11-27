import React, { useState, useEffect } from 'react'
import { Box, Flex, IconButton, Select, Text, Button } from '@chakra-ui/react'
import { MdPostAdd } from 'react-icons/md'
import { FiTrash2 } from 'react-icons/fi'
import { axiosInstance } from '../../../utils/axios'
import DashboardCourse from '../../../components/DashboardCourse'

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
    const [scheduleID, setScheduleID] = useState<string>('')
    const [courses, setCourses] = useState<Course[]>([])
    const [yearList, setYearList] = useState<number[]>([1, 2, 3, 4])
    const [year, setYear] = useState<number>(1)
    const [termCourses, setTermCourses] = useState<Course[][] | null>([])
    const [showDialog, setShowDialog] = useState<boolean>(false)
    const [graduate, setGraduate] = useState<any>()
    const [isWaiting, setIsWaiting] = useState<boolean>(false)

    useEffect(() => {
        let id: string

        const getSchedules = async () => {
            await axiosInstance.get('/schedule/all').then(res => {
                id = res.data[0]._id
            })

            !id &&
                axiosInstance.post('/schedule/').then(res => {
                    id = res.data?.scheduleID
                })

            setScheduleID(id)
        }

        getSchedules()
    }, [])

    useEffect(() => {
        const getCourses = async () => {
            const { data } = await axiosInstance.get(`/schedule/${scheduleID}`)
            setCourses(data)
        }

        const addCourse = async (
            courseCode: string,
            year: number,
            term: number,
        ) => {
            await axiosInstance.post(`/schedule/${scheduleID}`, {
                courseList: [{ courseID: courseCode, year, term }],
            })
        }

        document.addEventListener('getCourses', e => {
            getCourses()
        })

        document.addEventListener('addCourse', async (e: any) => {
            addCourse(e?.detail?.courseCode, e?.detail?.year, e?.detail?.term)
        })

        getCourses()
    }, [scheduleID])

    useEffect(() => {
        const filteredCourses = courses?.filter(
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
        const highestYear = courses?.reduce(
            (max, obj) => (obj.year > max ? obj.year : max),
            Number.MIN_SAFE_INTEGER,
        )

        if (highestYear > yearList.length) {
            setYearList(
                Array.from({ length: highestYear }, (_, index) => index + 1),
            )
        }
    }, [courses])

    useEffect(() => {
        graduate && setShowDialog(true)
    }, [graduate])

    const changeYear = (e: any) => {
        e?.target && setYear(e?.target.value)
    }

    const addYear = () => {
        const newYear = yearList[yearList.length - 1] + 1
        setYearList([...yearList, newYear])
        setYear(newYear)
    }

    const deleteYear = async () => {
        // Remove all the courses from the year
        const coursesToDrop = courses
            .filter(course => course.year == year)
            .map(course => course.courseID)

        await axiosInstance.delete(`/schedule/${scheduleID}`, {
            data: { courseID: coursesToDrop },
        })

        const event = new Event('getCourses')

        document.dispatchEvent(event)
    }

    const deleteCourse = async (course: string) => {
        await axiosInstance.delete(`/schedule/${scheduleID}`, {
            data: { courseID: [course] },
        })

        const event = new Event('getCourses')

        document.dispatchEvent(event)
    }

    const checkRequirements = async () => {
        setIsWaiting(true)
        await axiosInstance.post(`/graduate/${scheduleID}`).then(res => {
            setGraduate(res.data)
            setIsWaiting(false)
        })
    }

    return (
        <Box
            borderRadius="20px"
            bg="surface.main"
            w={{ base: '100%', lg: '65%' }}
            // h={{base: '100%', lg: '98%'}}
            m={{ base: 'none', lg: '10px' }}
            p={{ base: '20px 0', lg: '20px 30px' }}
        >
            <Flex
                flexDir={{ base: 'column', lg: 'row' }}
                justifyContent="space-between"
                marginBottom="20px"
                gap="2px"
                align={{ base: 'center', lg: 'none' }}
            >
                <Select
                    placeholder="Select schedule here"
                    w={{ base: '90%', lg: '30%' }}
                    bg="background"
                    value={year}
                    onChange={changeYear}
                >
                    {yearList.map((y: number) => (
                        <option value={y} key={y}>{`Year ${y}`}</option>
                    ))}
                </Select>
                <Flex gap="30px">
                    <Button
                        backgroundColor="primary.main"
                        color="white"
                        onClick={checkRequirements}
                        minWidth="121px"
                    >
                        <Text>
                            {isWaiting ? 'Waiting...' : 'Can I Graduate?'}
                        </Text>
                    </Button>
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
                        onClick={deleteYear}
                        icon={<FiTrash2 />}
                    />
                </Flex>
            </Flex>
            {showDialog && (
                <Flex
                    background={graduate?.canGraduate ? 'success' : 'error'}
                    w="100%"
                    color="black"
                    p="15px"
                    m="10px"
                    borderRadius="20px"
                    justifyContent="space-between"
                    gap="5px"
                >
                    <Flex
                        direction="column"
                        fontSize="xl"
                        color="red"
                        textAlign="start"
                    >
                        {graduate?.canGraduate ? (
                            <Text
                                fontSize="2xl"
                                fontWeight="bold"
                                color="Green"
                            >
                                Congrats! You can graduate with this schedule =D
                            </Text>
                        ) : (
                            <>
                                <Text fontSize="2xl" fontWeight="bold">
                                    Seems like there's a few things missing
                                </Text>
                                {graduate?.antirequisite && (
                                    <Text
                                        decoration="underline"
                                        fontWeight="bold"
                                    >
                                        Courses with antirequisites conflicts:
                                    </Text>
                                )}
                                {graduate?.antirequisite?.map((anti: any) => (
                                    <Text>{anti.courseID}</Text>
                                ))}
                                {graduate?.prerequisite && (
                                    <Text
                                        decoration="underline"
                                        fontWeight="bold"
                                    >
                                        Courses with prerequisites conflicts:
                                    </Text>
                                )}
                                {graduate?.prerequisite?.map((pre: any) => (
                                    <Text>{pre.courseID}</Text>
                                ))}
                                {graduate?.requirements && (
                                    <Text
                                        decoration="underline"
                                        fontWeight="bold"
                                    >
                                        Requirements missing:
                                    </Text>
                                )}
                                {graduate?.requirements?.map(
                                    (requirement: any) => {
                                        const { name, missing } = requirement
                                        return (
                                            <Flex>
                                                {name} -{missing}{' '}
                                                {missing > 1
                                                    ? 'courses'
                                                    : 'course'}{' '}
                                                missing
                                            </Flex>
                                        )
                                    },
                                )}
                            </>
                        )}
                    </Flex>
                    <Button
                        onClick={() => setShowDialog(false)}
                        borderRadius="50%"
                        background="background"
                    >
                        X
                    </Button>
                </Flex>
            )}
            <Flex
                flex="1"
                direction={{ base: 'column', lg: 'row' }}
                h="90%"
                justifyContent="space-between"
                overflow="auto"
            >
                {termCourses?.map((term: Course[], index: number) => (
                    <Flex
                        direction="column"
                        key={index}
                        bg="surface.dark"
                        w={{ base: '100%', lg: '30%' }}
                        h={{ base: '33%', lg: '85%' }}
                        m="10px"
                        borderRadius="20px"
                        overflow="auto"
                        minHeight="500px"
                    >
                        <Flex
                            m="20px"
                            pt="2px"
                            textAlign="center"
                            direction="column"
                            align="center"
                        >
                            <Flex
                                width="100%"
                                height="100%"
                                backgroundColor="surface.dark"
                                position="sticky"
                                top="0"
                                pt="20px"
                                zIndex="99"
                            >
                                <Text
                                    fontWeight="800"
                                    fontSize="xl"
                                    bg="surface.main"
                                    borderRadius="10px"
                                    p="15px"
                                    mb="30px"
                                    w="100%"
                                >
                                    {SemTitles[index]}
                                </Text>
                            </Flex>
                            <Flex
                                direction="column"
                                gap="10px"
                                pt="10px"
                                width="100%"
                            >
                                {term?.map((course: Course) => (
                                    <DashboardCourse
                                        key={course._id}
                                        courseCode={course.courseID}
                                        dropCourse={() =>
                                            deleteCourse(course.courseID)
                                        }
                                    />
                                ))}
                            </Flex>
                        </Flex>
                    </Flex>
                ))}
            </Flex>
        </Box>
    )
}

export default Schedule
