import React from 'react'
import { Box, Flex, IconButton, Select, Text } from '@chakra-ui/react'
import { MdPostAdd } from 'react-icons/md'
import { FiSave, FiTrash2 } from 'react-icons/fi'

const Schedule = () => {
    return (
        <Box
            borderRadius="20px"
            bg="surface.main"
            w="60%"
            h="100%"
            p="20px 30px"
        >
            <Flex
                flexDir="row"
                justifyContent="space-between"
                marginBottom="20px"
            >
                <Select
                    placeholder="Select schedule here"
                    w="30%"
                    bg="background"
                >
                    <option value="option1">Year 1</option>
                    <option value="option2">Year 2</option>
                    <option value="option3">Year 3</option>
                    <option value="option3">Year 4</option>
                </Select>
                <Flex gap="30px">
                    <IconButton
                        aria-label="add"
                        bg="none"
                        fontSize="36px"
                        icon={<MdPostAdd />}
                    />
                    <IconButton
                        aria-label="save"
                        bg="none"
                        fontSize="30px"
                        icon={<FiSave />}
                    />
                    <IconButton
                        aria-label="trash"
                        bg="none"
                        fontSize="30px"
                        icon={<FiTrash2 />}
                    />
                </Flex>
            </Flex>
            <Flex flexDir="row" h="90%" justifyContent="space-between">
                <Box bg="surface.dark" w="30%" maxW="300px" borderRadius="20px">
                    <Box
                        bg="surface.main"
                        borderRadius="10px"
                        m="20px"
                        h="30px"
                        pt="2px"
                    >
                        <Text fontWeight="800">Fall</Text>
                    </Box>
                </Box>
                <Box bg="surface.dark" w="30%" maxW="300px" borderRadius="20px">
                    <Box
                        bg="surface.main"
                        borderRadius="10px"
                        m="20px"
                        h="30px"
                        pt="2px"
                    >
                        <Text fontWeight="800">Winter</Text>
                    </Box>
                </Box>
                <Box bg="surface.dark" w="30%" maxW="300px" borderRadius="20px">
                    <Box
                        bg="surface.main"
                        borderRadius="10px"
                        m="20px"
                        h="30px"
                        pt="2px"
                    >
                        <Text fontWeight="800">Spring</Text>
                    </Box>
                </Box>
            </Flex>
        </Box>
    )
}

export default Schedule
