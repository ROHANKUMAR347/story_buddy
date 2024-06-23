import PropTypes from 'prop-types';
import { Box, Button, Heading, GridItem, Image, Text, useBreakpointValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const StoryCard = ({ story }) => {
    const imageHeight = useBreakpointValue({ base: '150px', md: '200px', lg: '250px' });

    return (
        <GridItem>
            <Box
                p={4}
                borderWidth="1px"
                borderRadius="md"
                boxShadow="md"
                overflow="hidden"
                transform="scale(1)"
                transition="transform 0.2s"
                _hover={{ transform: 'scale(1.0)' }}
            >
                <Image
                    src={story.image}
                    alt={story.title}
                    width="100%"
                    height={imageHeight}
                    objectFit="cover"
                    borderRadius="md"
                    mb={4}
                />
                <Heading as="h2" size="md" mb={2}>{story.title}</Heading>
                <Text fontWeight="bold" mb={2}>{story.category}</Text>
                <Text mb={4}>{story.story_description.slice(0, 100)}</Text>
                <Link to={`/storydetails/${story.id}`}>
                    <Button mt={2} colorScheme="teal">
                        Read story
                    </Button>
                </Link>
            </Box>
        </GridItem>
    );
};

StoryCard.propTypes = {
    story: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        story_description: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
    }).isRequired,
};

export default StoryCard;
