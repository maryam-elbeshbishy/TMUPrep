import React from 'react'
import {
    Flex,
    Spacer,
    Button,
    Image,
    Tooltip, // Import Tooltip
} from '@chakra-ui/react'
import {
    AiFillHome,
    AiFillBook,
    AiFillQuestionCircle,
    AiOutlineSearch,
} from 'react-icons/ai'

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
            maxHeight="5rem"
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
            <Flex>
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
                            <Image
                                className="logo"
                                src="src/assets/TMUPREP.png"
                                alt="Logo"
                            />
                        }
                    ></Button>
                </Tooltip>
            </Flex>

            <Spacer display={{ base: 'none', md: 'block' }} />

            {/* Second Box for the rest of the buttons */}
            <Flex gap={8}>
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
                        variant="link"
                        color="white"
                        _hover={{ color: 'white' }}
                        leftIcon={<AiFillHome size="2.8rem" />}
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
                        variant="link"
                        color="white"
                        _hover={{ color: 'white' }}
                        leftIcon={<AiOutlineSearch size="2.8rem" />}
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
                        variant="link"
                        color="white"
                        _hover={{ color: 'white' }}
                        leftIcon={<AiFillBook size="3rem" />}
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
                        variant="link"
                        color="white"
                        _hover={{ color: 'white' }}
                        leftIcon={<AiFillQuestionCircle size="3rem" />}
                    ></Button>
                </Tooltip>
            </Flex>
        </Flex>
    )
}

export default Navbar
