import React from 'react'
import { Flex, Text, Image, Grid } from '@chakra-ui/react'
import StaffProfile from '../../components/About/StaffProfile'

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
const About = () => {
    return (
        <Flex
            mx={['0vw', '0vw', '0vw', '0vw', '20vw']}
            flexDirection="column"
            align="center"
        >
            <Flex flexDirection="column" align="center">
                <Text fontSize={['3xl', '6xl']} as="b">
                    About TMUPrep
                </Text>
                <Image h="50vh" w={contentWidth} bg="gray"></Image>
                <Text w={contentWidth}>{placeHolder} </Text>
                <Image h="50vh" w={contentWidth} bg="gray"></Image>
                <Text w={contentWidth}>{placeHolder}</Text>
                <Image h="50vh" w={contentWidth} bg="gray"></Image>
                <Text w={contentWidth}>{placeHolder} </Text>
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
