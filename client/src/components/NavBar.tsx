import React from 'react'
import {
    Box,
    Flex,
    Spacer,
    Button,
    Image,
    Tooltip, // Import Tooltip
} from '@chakra-ui/react'

const Navbar: React.FC = () => {
    // const breakpoints = {
    //     sm: 0,
    //     md: undefined
    // }
    return (
        <Flex
            as="nav"
            justify="space-between"
            py="1rem"
            backgroundColor="#648DE6"
            width="100vw"
            position="fixed"
            left={0}
            right={0}
            bottom={[0, 'auto']}
            top={['auto', 0]}
            zIndex="sticky"
            // sx={{
            //     '@media screen and (max-width: 48em)': {
            //         bottom: 0,
            //         top: 'auto',
            //     },
            //     '@media screen and (min-width: 48em)': {
            //         top: 0,
            //         bottom: 'auto',
            //     }
            // }}
        >
            <Box>
                <Tooltip
                    label="Home"
                    sx={{
                        bgColor: '#FFECA8',
                        color: 'black',
                        padding: '0.5rem',
                        borderRadius: 'lg',
                    }}
                >
                    <Button
                        as="a"
                        href="/"
                        variant="ghost"
                        color="white"
                        leftIcon={
                            <Image src="src/assets/react.svg" alt="Home" />
                        }
                    ></Button>
                </Tooltip>
            </Box>

            <Spacer display={{ base: 'none', md: 'block' }} />

            {/* Second Box for the rest of the buttons */}
            <Box>
                <Tooltip
                    label="Dashboard"
                    sx={{
                        bgColor: '#FFECA8',
                        color: 'black',
                        padding: '0.5rem',
                        borderRadius: 'md',
                    }}
                >
                    <Button
                        as="a"
                        href="/dashboard"
                        variant="ghost"
                        color="white"
                        leftIcon={
                            <Image src="src/assets/react.svg" alt="Dashboard" />
                        }
                    ></Button>
                </Tooltip>
                <Tooltip
                    label="Hub"
                    sx={{
                        bgColor: '#FFECA8',
                        color: 'black',
                        padding: '0.5rem',
                        borderRadius: 'md',
                    }}
                >
                    <Button
                        as="a"
                        href="/hub"
                        variant="ghost"
                        color="white"
                        leftIcon={
                            <Image src="src/assets/react.svg" alt="Hub" />
                        }
                    ></Button>
                </Tooltip>
                <Tooltip
                    label="About"
                    sx={{
                        bgColor: '#FFECA8',
                        color: 'black',
                        padding: '0.5rem',
                        borderRadius: 'md',
                    }}
                >
                    <Button
                        as="a"
                        href="/about"
                        variant="ghost"
                        color="white"
                        leftIcon={
                            <Image src="src/assets/react.svg" alt="About" />
                        }
                    ></Button>
                </Tooltip>
                <Tooltip
                    label="FAQ"
                    sx={{
                        bgColor: '#FFECA8',
                        color: 'black',
                        padding: '0.5rem',
                        borderRadius: 'md',
                    }}
                >
                    <Button
                        as="a"
                        href="/faq"
                        variant="ghost"
                        color="white"
                        leftIcon={
                            <Image src="src/assets/react.svg" alt="FAQ" />
                        }
                    ></Button>
                </Tooltip>
            </Box>

            <Box>
                {/* Add your user authentication components or any other elements here */}
            </Box>
        </Flex>
    )
}

export default Navbar
