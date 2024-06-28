import PropTypes from 'prop-types';
import { Box, Heading, Text, Image, Flex, Badge, useColorModeValue } from '@chakra-ui/react';

const StoryDetail = ({ story }) => {
    const bg = useColorModeValue("gray.100", "gray.800");
    return (
        <Box

            borderWidth="1px"
            borderColor="gray.200"
            borderRadius="lg"
            overflow="hidden"
            p={8}
            m={4}
            boxShadow="md"
            background={bg}
        >
            <Flex direction={["column", "column", "row"]} mb={4} align="center">
                <Image
                    src={story.image}
                    alt={story.title}
                    w={[60, 80]}
                    h={[60, 80]}
                    mr={4}
                    borderRadius="md"
                    boxShadow="sm"
                />
                <Box>
                    <Heading
                        as="h3"
                        size="lg"
                        mb={2}
                        fontWeight="semibold"
                        fontFamily="Open Sans"
                    >
                        {story.title}
                    </Heading>
                    <Badge
                        variant="solid"
                        colorScheme="blue"
                        mb={2}
                        fontSize={"md"}
                        borderRadius="full"
                        px={3}
                        py={1}
                    >
                        {story.category}
                    </Badge>
                </Box>
            </Flex>
            <Text
                fontSize={["md", "lg", "xl"]}
                mb={4}
                lineHeight={2}
                color="gray.600"
                textAlign="justify"
            >
                {story.story_description}
            </Text>

        </Box>
    );
};

StoryDetail.propTypes = {
    story: PropTypes.shape({
        id: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        story_description: PropTypes.string.isRequired,
    }).isRequired,
};

export default StoryDetail;