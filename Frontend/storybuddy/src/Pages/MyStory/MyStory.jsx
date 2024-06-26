import { useEffect, useState } from 'react';
import { Box, Heading, Grid, Select, useBreakpointValue, useToast, useColorModeValue, Skeleton } from '@chakra-ui/react';
import axios from 'axios';
import MyStoryCard from './MyStoryCard';

const MyStory = () => {
    const [stories, setStories] = useState([]);
    const [filteredStories, setFilteredStories] = useState([]);
    const [filter, setFilter] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);  // Added loading state
    const toast = useToast();

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            fetchStories();
        } else {
            setIsLoggedIn(false);
            // Optionally, you can redirect to the login page here
        }
    }, []);

    const fetchStories = async () => {
        try {
            const response = await axios.get('https://story-buddy.onrender.com/story/userstory/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setStories(response.data);
            setFilteredStories(response.data);
        } catch (error) {
            console.error('Error fetching stories:', error);
            toast({
                title: 'Error fetching stories',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setLoading(false);  // Set loading to false after fetching data
        }
    };

    const handleFilterChange = (e) => {
        const selectedCategory = e.target.value;
        setFilter(selectedCategory);
        if (selectedCategory) {
            const filtered = stories.filter(story => story.category === selectedCategory);
            setFilteredStories(filtered);
        } else {
            setFilteredStories(stories);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://story-buddy.onrender.com/story/userstory/?id=${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            toast({
                title: 'Story deleted successfully',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            fetchStories(); // Assuming fetchStories is a function to update the story list after deletion
        } catch (error) {
            console.error('Error deleting story:', error);
            toast({
                title: 'Error deleting story',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const gridTemplateColumns = useBreakpointValue({
        base: '1fr', // 1 card on mobile view
        md: 'repeat(2, 1fr)', // 2 cards on tablet view
        lg: 'repeat(3, 1fr)', // 3 cards on laptop view
        xl: 'repeat(4, 1fr)', // 4 cards on desktop view
    });
    const bg = useColorModeValue("gray.100", "gray.800");

    if (!isLoggedIn) {
        return (
            <Box p={4} display={"flex"} flexDir={"column"} textAlign={"center"} minH={"500px"} background={bg}>
                <Heading as="h1" mb={4}>Login Your Account</Heading>
                <p>You need to signin to access this page.</p>
            </Box>
        );
    }

    return (
        <Box p={4} background={bg}>
            <Heading as="h1" mb={4} mt={6}>Your Stories</Heading>
            <Select placeholder="Filter by category" value={filter} onChange={handleFilterChange} mb={4}>
                <option value="Fiction">Fiction</option>
                <option value="Non-fiction">Non-fiction</option>
                <option value="Poetry">Poetry</option>
            </Select>
            {loading ? (
                <Grid templateColumns={gridTemplateColumns} gap={6}>
                    {Array.from({ length: 12 }).map((_, index) => (
                        <Skeleton key={index} height="200px" borderRadius="md" />
                    ))}
                </Grid>
            ) : (
                <Grid templateColumns={gridTemplateColumns} gap={6}>
                    {filteredStories.map(story => (
                        <MyStoryCard key={story.id} story={story} onDelete={handleDelete} onUpdate={fetchStories} />
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default MyStory;
