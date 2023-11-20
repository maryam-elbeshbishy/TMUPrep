// import { Box, Flex, Button } from '@chakra-ui/react'

// function NavBar() {
//     return (
//         <Flex
//             bg="#648DE6"
//             pos="fixed"
//             top="0"
//             left="0"
//             width="100%"
//             display="Grid"
//             gridTemplateColumns="repeat(3,1fr)"
//             gridGap="20px"
//         >
//             <Box width="10%">
//                 <Button height="80%" marginTop="5px" variant="outline">
//                     Button
//                 </Button>
//             </Box>
//             <Box>
//                 <Button height="80%" marginTop="5px" variant="outline">
//                     Button
//                 </Button>
//             </Box>
//         </Flex>
//     )
// }

// export default NavBar

import { Box, Flex, Spacer, IconButton } from '@chakra-ui/react'

function NavBar() {
    return (
        <Flex
            bg="#648DE6"
            color="white"
            minHeight="50px"
            width="100%"
            px={4}
            align="center"
            position="fixed"
            top={0}
            left={0}
        >
            {'TMU PREP'}
            <Box p="2">
                <IconButton
                    icon={<Box as="span">🐘</Box>}
                    variant="outline"
                    aria-label="Open menu"
                    isRound
                />
            </Box>

            <Spacer />

            {/* nav icons here */}

            <Flex align="center">
                <IconButton
                    icon={<Box as="span">🐘</Box>}
                    variant="ghost"
                    aria-label="Search database"
                    mx={2}
                />

                <IconButton
                    icon={<Box as="span">🐘</Box>}
                    variant="ghost"
                    aria-label="Notifications"
                    mx={2}
                />
                <IconButton
                    icon={<Box as="span">🐘</Box>}
                    variant="ghost"
                    aria-label="Help"
                    mx={2}
                />
            </Flex>
        </Flex>
    )
}

export default NavBar
