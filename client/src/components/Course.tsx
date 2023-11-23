import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Flex,
} from '@chakra-ui/react'

type CourseProps = {
    courseCode: string
    courseName: string
    courseDesc: string
}

function Course({ courseCode, courseName, courseDesc }: CourseProps) {
    return (
        <Flex overflow="hidden" maxW="600px">
            <Box bg="success" borderLeftRadius="5px" p="5px 20px">
                {courseCode.substring(0, 3)}
                <Box as="br" />
                {courseCode.substring(3, 6)}
            </Box>
            <Accordion
                allowMultiple
                bg="surface.dark"
                width="100%"
                borderRightRadius="5px"
                borderColor="surface.dark"
            >
                <AccordionItem borderRightRadius="5px">
                    <AccordionButton pt="16px">
                        <Box as="span" flex="1" textAlign="left">
                            {courseName}
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} textAlign="left">
                        {courseDesc}
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Flex>
    )
}
export default Course
