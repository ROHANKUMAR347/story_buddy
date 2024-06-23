import { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Box, Button, Heading, GridItem, Image, Text, useBreakpointValue,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
    ModalBody, ModalFooter, Input, Textarea
} from '@chakra-ui/react';
import axios from 'axios';

const MyStoryCard = ({ story, onDelete, onUpdate }) => {

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [updatedStory, setUpdatedStory] = useState({ title: story.title, category: story.category, image: story.image, story_description: story.story_description });

    const imageHeight = useBreakpointValue({ base: '150px', md: '200px', lg: '250px' });

    const handleUpdateChange = (e) => {
        setUpdatedStory({ ...updatedStory, [e.target.name]: e.target.value });
    };

    const handleUpdateSubmit = async () => {
        try {
            await axios.put(`http://localhost:3000/story/userstory/?id=${story.id}`, updatedStory, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            onUpdate();
            setIsUpdateModalOpen(false);
            console.log(story.id)
        } catch (error) {
            console.error('Error updating story:', error);
        }
    };

    return (
        <GridItem>
            <Box p={4} borderWidth="1px" borderRadius="md" boxShadow="md" overflow="hidden">
                <Image src={story.image} alt={story.title} width="100%" height={imageHeight} objectFit="cover" borderRadius="md" mb={4} />
                <Heading as="h2" size="md" mb={2}>{story.title}</Heading>
                <Text fontWeight="bold" mb={2}>{story.category}</Text>
                <Text mb={4}>{story.story_description.slice(0, 100)}...</Text>
                <Box display={"flex"} flexDirection={{ base: 'column', md: 'row' }} justifyContent="space-between">
                    <Button mt={2} colorScheme="teal" mr={{ base: 0, md: 2 }} mb={{ base: 2, md: 0 }}>
                        Read Story
                    </Button>

                    <Button key={story.id} onClick={() => setIsUpdateModalOpen(true)} mt={2} colorScheme="blue" mr={{ base: 0, md: 2 }} mb={{ base: 2, md: 0 }}>
                        Update
                    </Button>
                    <Button onClick={() => onDelete(story.id)} mt={2} colorScheme="red" mb={{ base: 2, md: 0 }}>
                        Delete
                    </Button>
                </Box>
            </Box>
            <Modal isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Story</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            name="title"
                            placeholder="Title"
                            value={updatedStory.title}
                            onChange={handleUpdateChange}
                            mb={4}
                        />
                        <Input
                            name="category"
                            placeholder="Category"
                            value={updatedStory.category}
                            onChange={handleUpdateChange}
                            mb={4}
                        />
                        <Input
                            name="image"
                            placeholder="Image URL"
                            value={updatedStory.image}
                            onChange={handleUpdateChange}
                            mb={4}
                        />
                        <Textarea
                            name="story_description"
                            placeholder="Story Description"
                            value={updatedStory.story_description}
                            onChange={handleUpdateChange}
                        />
                    </ModalBody>
                    <ModalFooter justifyContent="center">
                        <Button colorScheme="blue" mr={3} onClick={handleUpdateSubmit}>
                            Save
                        </Button>
                        <Button variant="ghost" onClick={() => setIsUpdateModalOpen(false)}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </GridItem>
    );
};

MyStoryCard.propTypes = {
    story: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        story_description: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
};

export default MyStoryCard;
