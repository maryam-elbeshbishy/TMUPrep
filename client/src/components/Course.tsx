import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Flex,
    Text,
} from '@chakra-ui/react'

type CourseProps = {
    courseCode: string
    courseName: string
    courseDesc: string
}

function Course({ courseCode, courseName, courseDesc }: CourseProps) {
    return (
        <Flex overflow="hidden">
            <Box bg="success" borderLeftRadius="10px" p="5px 20px">
                <Text fontSize="2xl">{courseCode.substring(0, 3)}</Text>
                <Text fontSize="2xl">{courseCode.substring(3, 6)}</Text>
            </Box>
            <Accordion
                allowMultiple
                bg="surface.dark"
                width="100%"
                borderRightRadius="10px"
                borderColor="surface.dark"
            >
                <AccordionItem borderRightRadius="10px">
                    <AccordionButton
                        pt="15px"
                        fontSize="2.5rem"
                        color="accent.main"
                    >
                        <Box as="span" flex="1" textAlign="left">
                            <Text fontSize="2xl" color="gray.800">
                                {courseName}
                            </Text>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} textAlign="left">
                        <Text fontSize="lg">{courseDesc}</Text>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Flex>
    )
}
export default Course
