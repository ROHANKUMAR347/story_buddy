import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, Select, useToast, Flex, Heading, ModalOverlay, Modal, Spinner, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';

const AddStory = () => {

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [storyDescription, setStoryDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const token = localStorage.getItem('token'); // Retrieve authentication token from local storage
            if (!token) {
                throw new Error('User is not authenticated');
            }

            await axios.post('http://localhost:3000/story/add', {
                title,
                category,
                image,
                story_description: storyDescription,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the request headers
                },
            });

            setIsLoading(false);
            onOpen(); // Open modal on success
            setTitle('');
            setCategory('');
            setImage('');
            setStoryDescription('');
        } catch (error) {
            setIsLoading(false);
            toast({
                title: 'An error occurred.',
                description: error.response?.data?.error || 'Failed to create story.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Box>
            <Flex align="center" direction="column" minH="70vh" >
                <Heading as="h1" size="xl" mb={8} color="white">
                    Create Your Story
                </Heading>
                <Box width={["250px", "450px", "700px"]} mt={8} p={4} borderWidth="1px" borderRadius="lg" boxShadow="lg">
                    <form onSubmit={handleSubmit}>
                        <FormControl id="title" isRequired>
                            <FormLabel>Title</FormLabel>
                            <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </FormControl>

                        <FormControl id="category" isRequired mt={4}>
                            <FormLabel>Category</FormLabel>
                            <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Select category</option>
                                <option value="Fiction">Fiction</option>
                                <option value="Non-fiction">Non-fiction</option>
                                <option value="Poetry">Poetry</option>
                                <option value="science">Science</option>
                                <option value="history">History</option>
                                <option value="fantasy">Fantasy</option>
                                <option value="mystery">Mystery</option>
                                <option value="Mythology">Mythology</option>
                                <option value="comedy">comedy</option>
                            </Select>
                        </FormControl>

                        <FormControl id="image" isRequired mt={4}>
                            <FormLabel>Image URL</FormLabel>
                            <Input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
                        </FormControl>

                        <FormControl id="storyDescription" isRequired mt={4}>
                            <FormLabel>Story Description</FormLabel>
                            <Textarea value={storyDescription} onChange={(e) => setStoryDescription(e.target.value)} />
                        </FormControl>

                        <Button mt={4} colorScheme="teal" type="submit" width="full">
                            {isLoading ? <Spinner size="sm" /> : 'Create Story'}
                        </Button>
                    </form>

                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Story Created</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                Your story has been successfully created!
                            </ModalBody>
                            <ModalFooter>
                                <Button colorScheme="teal" onClick={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Box>
            </Flex>
        </Box>
    );
};

export default AddStory;
