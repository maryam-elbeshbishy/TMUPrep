import React from 'react'
import { Flex, Text, Image, Grid } from '@chakra-ui/react'
import StaffProfile from '../../components/About/StaffProfile'
import whoWeAre_1 from '../../assets/whoWeAre_1.png'
import whyCreated_1 from '../../assets/whyCreated_1.png'
import values from '../../assets/values.png'
// TODO: Replace persons array with actual data of our staff

const contentWidth = ['90vw', '80vw', '30vw']

const persons = [
    {
        imageSrc: 'https://bit.ly/dan-abramov',
        firstName: 'Dan',
        lastName: 'Abramov',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
        imageSrc: 'https://bit.ly/dan-abramov',
        firstName: 'Dan',
        lastName: 'Abramov',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
]

const placeHolder =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
const whoWeAre = "TMUPrep is a handy app that helps both incoming and current TMU students make the most of their semesters. It's all about creating a straightforward and user-friendly experience for incoming and current computer science students. There is a dashboard that neatly displays all the essential courses. It even provides you with instant feedback on your path to graduation!"
const whyCreated = "We came up with TMUPrep to make life easier for students who were feeling overwhelmed by the whole university planning process. As fellow computer science students at TMU, we understand the frustration of not having a clear and user-friendly way to keep track of all the courses we've taken or want to take. With TMUPrep, you can easily plan your required courses while having a complete list of all the options available for computer science students. No more jumping between pages for different requirements – it's all right there for you."
const userFriendly = "We are TMU students, just like you! We experienced the frustrations of using the tools given by the university first hand. That's why we've created a design that's user-friendly and intuitive, just the way you'd want it."
const simple = "Our webpage aims to simplify the seemingly complex process for completing all the requirements when planning your courses. We want to take the confusion out of planning your courses and make accessible for students!"
const efficiency = "The product’s main mission is to make the course planning process simple and stress-free so you can save time and can focus on the things that really matter in your life!"
const About = () => {
    return (
        <Flex
            mx={['0vw', '0vw', '0vw', '0vw', '20vw']}
            flexDirection="column"
            pt="70px"
            align="center"
        >
            <Flex flexDirection="column" align="center" fontSize="lg">
                <Text fontSize={['3xl', '6xl']} as="b">
                    About TMUPrep
                </Text>
                <Image src={whoWeAre_1} w={contentWidth} bg="gray"></Image>
                <Text fontWeight="bold" w={contentWidth} fontSize="3xl">What is TMUPrep?</Text>
                <Text textAlign="start" w={contentWidth}>{whoWeAre} </Text>

                <Image src={whyCreated_1} w={contentWidth} bg="gray"></Image>
                <Text fontWeight="bold" w={contentWidth} fontSize="3xl">Why was it created?</Text>
                <Text textAlign="start" w={contentWidth}>{whyCreated}</Text>

                <Image src={values} w={contentWidth} bg="gray"></Image>
                <Text fontWeight="bold" w={contentWidth} fontSize="3xl">Our Values</Text>

                <Text textAlign="start"fontWeight="bold" w={contentWidth} fontSize="2xl">Simplicity</Text>
                <Text textAlign="start" w={contentWidth}>{simple} </Text>
                <Text textAlign="start" fontWeight="bold" w={contentWidth} fontSize="2xl">User-Friendly</Text>
                <Text textAlign="start" w={contentWidth}>{userFriendly} </Text>
                <Text textAlign="start" fontWeight="bold" w={contentWidth} fontSize="2xl">Efficiency</Text>
                <Text textAlign="start" w={contentWidth}>{efficiency} </Text>
            </Flex>
            <Text align="center" fontSize="6xl" as="b">
                Our Staff
            </Text>
            <Grid
                templateColumns={[
                    'repeat(1, 1fr)',
                    'repeat(1, 1fr)',
                    'repeat(2, 1fr)',
                    'repeat(2, 1fr)',
                ]}
                gap={6}
            >
                {persons.map(person => {
                    const { imageSrc, firstName, lastName, description } =
                        person
                    return (
                        <StaffProfile
                            imageSrc={imageSrc}
                            firstName={firstName}
                            lastName={lastName}
                            description={description}
                        />
                    )
                })}
            </Grid>
        </Flex>
    )
}

export default About
