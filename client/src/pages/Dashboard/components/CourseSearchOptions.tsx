import { Box, VStack, IconButton } from '@chakra-ui/react'
import { FaChevronRight, FaChevronDown, FaPlus } from 'react-icons/fa'
import { useState } from 'react'

type CourseSearchOptionProps = {
    code: string
    name: string
    description: string
    prereqs: string[]
    antireqs: string[]
}

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
        </Box>
    )
}

export default CourseSearchOption
