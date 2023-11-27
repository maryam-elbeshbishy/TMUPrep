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
import { logOut } from '../services/auth'

const NavBar: React.FC = () => {
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
            height="80px"
            position="fixed"
            left={0}
            right={0}
            bottom={[0, 'auto']}
            top={['auto', 0]}
            zIndex="sticky"
        >
            <Flex display={{ base: 'none', sm: 'block' }}>
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
                        _hover={{ bg: 'none' }}
                        h="100%"
                        children={
                            <Image
                                className="logo"
                                src="src/assets/TMUPREP.png"
                                alt="Logo"
                                h="100%"
                            />
                        }
                    ></Button>
                </Tooltip>
            </Flex>

            <Spacer display={{ base: 'none', sm: 'block' }} />

            {/* Second Box for the rest of the buttons */}
            <Flex flex="1" justify={{ base: 'center', sm: 'flex-end' }} gap={8}>
                <Tooltip
                    label="Home"
                    sx={{
                        bgColor: '#FFECA8',
                        color: 'black',
                        padding: '0.5rem',
                        borderRadius: 'md',
                    }}
                >
                    <Button
                        as="a"
                        href="/"
                        variant="link"
                        color="white"
                        _hover={{ color: 'white' }}
                        leftIcon={<AiFillHome size="2.8rem" />}
                    ></Button>
                </Tooltip>
                <Tooltip
                    label="Courses"
                    sx={{
                        bgColor: '#FFECA8',
                        color: 'black',
                        padding: '0.5rem',
                        borderRadius: 'md',
                    }}
                >
                    <Button
                        as="a"
                        href="/coursehub"
                        variant="link"
                        color="white"
                        _hover={{ color: 'white' }}
                        leftIcon={<AiOutlineSearch size="2.8rem" />}
                    ></Button>
                </Tooltip>
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
                        leftIcon={<AiFillBook size="3rem" />}
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
                        leftIcon={<AiFillQuestionCircle size="3rem" />}
                    ></Button>
                </Tooltip>
                <Tooltip
                    label="Log Out"
                    sx={{
                        bgColor: '#FFECA8',
                        color: 'black',
                        padding: '0.5rem',
                        borderRadius: 'md',
                    }}
                >
                    <Button
                        as="a"
                        href="/"
                        variant="link"
                        color="white"
                        _hover={{ color: 'white' }}
                        onClick={logOut}
                        pr="1rem"
                    >
                        Log Out
                    </Button>
                </Tooltip>
            </Flex>
        </Flex>
    )
}

export default NavBar
