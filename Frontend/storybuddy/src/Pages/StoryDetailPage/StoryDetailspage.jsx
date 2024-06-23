import { useParams } from 'react-router-dom';
import { Box, Spinner, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import StoryDetail from '../../Components/StoryDetails/StoryDetail';


const StoryPage = () => {
    const { id } = useParams();
    const [story, setStory] = useState(null);
    const [loading, setLoading] = useState(true);
    const toast = useToast();

    useEffect(() => {
        const fetchStoryById = async () => {
            try {
                const response = await axios.get(`https://story-buddy.onrender.com/story/${id}`); // Correct URL
                setStory(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching story:', error);
                toast({
                    title: 'Error fetching story',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        };

        fetchStoryById();
    }, [id, toast]);

    if (loading) {
        return (
            <Box display={"flex"} justifyContent={"center"}
                alignItems={"center"} mt={8}>
                <Spinner size="xl" />;
            </Box>
        )
    }

    return <StoryDetail story={story} />;
};

export default StoryPage;
