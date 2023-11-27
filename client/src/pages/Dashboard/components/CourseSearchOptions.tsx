import {
    Box,
    VStack,
    IconButton,
    Popover,
    PopoverTrigger,
    Portal,
    PopoverContent,
    PopoverCloseButton,
    Button,
    PopoverArrow,
    PopoverBody,
    PopoverHeader,
} from '@chakra-ui/react'
import { FaChevronRight, FaChevronDown, FaPlus } from 'react-icons/fa'
import { useState } from 'react'
import { axiosInstance } from '../../../utils/axios'

type CourseSearchOptionProps = {
    code: string
    name: string
    description: string
    prereqs: string[]
    antireqs: string[]
}
const years = [1, 2, 3, 4]

const terms = {
    "Fall": 1,
    "Winter": 2,
    "Spring": 3
};


function CourseSearchOption({
    code,
    name,
    description,
    prereqs,
    antireqs,
}: CourseSearchOptionProps) {
    const [selected, setSelected] = useState(false)
    const handleClick = () => {
        setSelected(!selected)
    }
    const addCourse = (year: number, termNumber: number) => async (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log(`Year: ${year}, Term: ${termNumber}`);
        console.log(event)
        const res = await axiosInstance.post(
            '/schedule/65643045f35a162b45d3679b',
            {
                courseList: [
                    {
                        courseID: code,
                        year: year,
                        term: termNumber,
                    },
                ],
            },
        )
        console.log(res);
    };
    
    const getYears = () => {
        const buttons = [];
        for (const year of years) {
            for (const [termName, termNumber] of Object.entries(terms)) {
                const buttonLabel = `Year ${year} - ${termName}`;
                buttons.push(
                    <Button key={`${year}-${termNumber}`} onClick={(event) => addCourse(year, termNumber)(event)} m="5px" colorScheme="blue">
                        {buttonLabel}
                    </Button>
                );
            }
        }
        return buttons;
    };
    

    return (
        <Box
            position="relative"
            bg="surface.main"
            borderRadius="10px"
            padding="10px"
            width="100%"
        >
            <VStack align="start">
                <Box
                    width="100%"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    cursor="pointer"
                    onClick={handleClick}
                >
                    <Box fontWeight="bold">{code}</Box>
                    {selected ? (
                        <FaChevronDown /> // Down arrow when expanded
                    ) : (
                        <FaChevronRight /> // Right arrow when collapsed
                    )}
                </Box>
                <Box>{name}</Box>
                <Box
                    noOfLines={selected ? 0 : 2}
                    overflow="hidden"
                    textAlign="start"
                    // display={display}
                >
                    {description}
                    {prereqs && (
                        <Box>
                            <Box fontWeight="bold">Prerequisites:</Box>
                            <Box>{prereqs.join(', ')}</Box>
                        </Box>
                    )}
                    {antireqs && (
                        <Box>
                            <Box fontWeight="bold">Antirequisites:</Box>
                            <Box>{antireqs.join(', ')}</Box>
                        </Box>
                    )}
                </Box>
            </VStack>
            {/* Plus icon */}
            <Popover>
                <PopoverTrigger>
                    <IconButton
                        icon={<FaPlus />}
                        aria-label="Add"
                        size="sm"
                        position="absolute"
                        bottom="0"
                        right="0"
                        borderRadius="50%"
                        border="1px solid"
                        margin="5px"
                        bg="surface.main"
                    />
                </PopoverTrigger>
                <Portal>
                    <PopoverContent>
                        <PopoverArrow />
                        <PopoverHeader>Year</PopoverHeader>
                        <PopoverCloseButton />
                        <PopoverBody>{getYears()}</PopoverBody>
                    </PopoverContent>
                </Portal>
            </Popover>
        </Box>
    )
}

export default CourseSearchOption
