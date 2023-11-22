import React, { useContext } from 'react'
/// <reference types="vite-plugin-svgr/client" />
import PreviewHero from '../../assets/landing/previewHeroTwo.svg'
import TmuPrepHero from '../../assets/landing/tmuPrepHero.svg'
import {
    Button,
    Center,
    Image,
    Flex,
    Box,
    Text,
    Spacer,
    Stack,
    Link,
} from '@chakra-ui/react'
import { logIn } from '../../services/auth'
import { GlobalContext } from '../../contexts/GlobalContext'
import { Navigate } from 'react-router-dom'

const Landing = () => {
    const { state } = useContext(GlobalContext)

    if (state.isAuthenticated == null) return <></>
    return state.isAuthenticated ? (
        <Navigate to="/dashboard" />
    ) : (
        <Box bg="surface.main" w="100vw" h="100vh">
            <Center h="100%" w="100%" flexDirection="column">
                <Box w="100vw">
                    <Flex color="white">
                        <Flex
                            flex="1"
                            flexDirection="column"
                            color="white"
                            align={['center', 'center', 'left']}
                        >
                            <Stack pl={['0', '0', '0', '0', '5vw']} flex="1">
                                <Image
                                    align="left"
                                    h={['100%', '100%', '65%']}
                                    w={['100%', '100%', '65%']}
                                    src={TmuPrepHero}
                                    sx={{
                                        filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
                                    }}
                                />
                                <Text
                                    align="left"
                                    ml="2vw"
                                    color="black"
                                    fontSize={['md', 'xl', '2xl', '3xl', '4xl']}
                                    display={['none', 'none', 'block']}
                                >
                                    All in one course tracker and planning tool
                                    to help TMU students max out their semesters
                                </Text>
                                <Flex
                                    w="100%"
                                    justifyContent={[
                                        'center',
                                        'center',
                                        'flex-start',
                                    ]}
                                >
                                    <Button
                                        onClick={logIn}
                                        variant="outline"
                                        ml={['0', '0', '2vw']}
                                        h={['15vh', '15vh', '10vh']}
                                        bg="primary.main"
                                        color="white"
                                        w={[
                                            '40vw',
                                            '25vw',
                                            '18vw',
                                            '15vw',
                                            '10vw',
                                        ]}
                                    >
                                        Sign In
                                    </Button>
                                </Flex>
                            </Stack>
                        </Flex>

                        <Flex
                            display={['none', 'none', 'block']}
                            align="right"
                            flex="1"
                        >
                            <Spacer />
                            <Image h="95%" w="100%" src={PreviewHero} />
                        </Flex>
                    </Flex>
                </Box>
                <Flex
                    as="u"
                    color="black"
                    mb="2vh"
                    position="fixed"
                    bottom={0}
                    w="100%"
                >
                    <Link href="/about" fontSize="2xl" ml="7%">
                        Contact Us
                    </Link>
                    <Spacer />
                    <Link href="/about" fontSize="2xl" mr="7%">
                        About Us
                    </Link>
                </Flex>
            </Center>
        </Box>
    )
}

export default Landing
