// Pagination Component
import React, { useState } from 'react'
import { Box } from '@chakra-ui/react'
import Pagination from './Pagination'

const PaginComponent: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const totalPages: number = 3 // Replace with the total number of pages in your data set

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        // Add code to fetch and display data for the selected page
    }

    return (
        <Box>
            {/* data rendering logic here */}

            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </Box>
    )
}

export default PaginComponent
