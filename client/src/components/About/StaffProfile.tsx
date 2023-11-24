import React from 'react'
import { Flex, Image, Text, Center } from '@chakra-ui/react'

type StaffProfileProps = {
    imageSrc: string
    firstName: string
    lastName: string
    description: string
}

const StaffProfile = (props: StaffProfileProps) => {
    const { imageSrc, firstName, lastName, description } = props
    return (
        <Center>
            <Flex
                flex="1"
                className="staff-profile"
                minWidth="400px"
                flexDirection="column"
                align="center"
            >
                <Image
                    w="50%"
                    h="50%"
                    src={imageSrc}
                    alt={`${firstName} ${lastName}`}
                />
                <Text as="b" fontSize="5xl">{`${firstName}`}</Text>
                <Text as="b" fontSize="3xl">{`${lastName}`}</Text>
                <Text maxWidth="50%">{description}</Text>
            </Flex>
        </Center>
    )
}

export default StaffProfile
