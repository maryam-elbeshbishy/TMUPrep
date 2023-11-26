// PAGINATION
import React from 'react'
import { Flex, Button } from '@chakra-ui/react'

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
        <Flex>
            {[...Array(totalPages)].map((_, index) => (
                <Button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    variant={currentPage === index + 1 ? 'solid' : 'ghost'}
                    color={currentPage === index + 1 ? '#648DE6' : '#648DE6'}
                    border={
                        currentPage === index + 1 ? '1px solid #648DE6' : 'none'
                    }
                    _hover={{
                        background: currentPage !== index + 1 && '#FFECA8',
                    }}
                    size="sm"
                    background="transparent"
                >
                    {index + 1}
                </Button>
            ))}
        </Flex>
    )
}

export default Pagination
