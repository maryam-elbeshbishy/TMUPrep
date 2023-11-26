import { Box, VStack, Input, useBreakpointValue } from '@chakra-ui/react'
import CourseSearchOption from './CourseSearchOptions.tsx'

const Sidebar = () => {
    const sidebarTopPadding = useBreakpointValue({
        base: '20px',
        sm: '100px',
    })
    const sidebarWidth = useBreakpointValue({
        base: '100vw',
        sm: '50vw',
        md: '30vw',
    })
    const sidebarHeight = useBreakpointValue({
        base: 'fit-content',
        sm: '100vh',
    })

    return (
        <Box
            bg="secondary.dark"
            w={sidebarWidth}
            h={sidebarHeight}
            position="fixed"
            top="0"
            left="0"
            overflowY="auto"
            p="20px"
            pt={sidebarTopPadding}
        >
            <VStack spacing="20px">
                <Input
                    bg="surface.main"
                    border="none"
                    borderRadius="10px"
                    type="text"
                    placeholder="Type here for a course..."
                />

                <CourseSearchOption
                    code="CPS 109"
                    name="Computer Science I"
                    description="An introductory programming course designed to introduce fundamental Computer Science concepts such as abstraction, modelling and algorithm design. Emphasis is placed on producing correct software. Replaces CPS 513"
                    prereqs={['CPS 103', 'CPS 104']}
                    antireqs={['CPS 210']}
                />

                <CourseSearchOption
                    code="CPS 209"
                    name="Computer Science II"
                    description="A continuation of CPS 109. Emphasis is placed on code structure, algorithm development, and Object Oriented design principles."
                    prereqs={['CPS 109']}
                    antireqs={['CPS 310']}
                />
            </VStack>
        </Box>
    )
}

export default Sidebar
