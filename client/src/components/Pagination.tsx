// PAGINATION
import React from 'react'
import { Flex, IconButton, Text } from '@chakra-ui/react'
import { GoTriangleLeft, GoTriangleRight } from 'react-icons/go'
interface PaginationProps {
    totalPages: number
    currentPage: number
    onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
    totalPages,
    currentPage,
    onPageChange,
}) => {
    const handlePageChange = (page: number) => {
        onPageChange(page)
    }

    return (
        <Flex flexDir="row" alignItems="center" gap="5px">
            <IconButton
                aria-label="left"
                bg="none"
                fontSize="36px"
                icon={<GoTriangleLeft />}
                onClick={() => {
                    handlePageChange(currentPage - 1)
                }}
            />
            <Text>Page</Text>
            <Text display="inline" fontWeight="bold">
                {currentPage}
            </Text>
            <Text>of</Text>
            <Text display="inline" fontWeight="bold">
                {totalPages}
            </Text>
            <IconButton
                aria-label="right"
                bg="none"
                fontSize="36px"
                icon={<GoTriangleRight />}
                onClick={() => {
                    handlePageChange(currentPage + 1)
                }}
            />
        </Flex>
    )
}

export default Pagination
