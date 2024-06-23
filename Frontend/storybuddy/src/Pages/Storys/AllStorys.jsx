import { useEffect, useState } from 'react';
import { Box, Heading, Grid, Select, useBreakpointValue, Button, Input, Skeleton, Flex } from '@chakra-ui/react';
import axios from 'axios';
import StoryCard from '../../Components/StoryCard/StoryCard';

const StoriesPage = () => {
    const [stories, setStories] = useState([]);
    const [filteredStories, setFilteredStories] = useState([]);
    const [filter, setFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true); // State to track loading
    const itemsPerPage = 12; // Number of items per page

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await axios.get('http://localhost:3000/story/');
                setStories(response.data);
                setFilteredStories(response.data);
                setLoading(false); // Set loading to false once data is fetched
            } catch (error) {
                console.error('Error fetching stories:', error);
                setLoading(false); // Set loading to false in case of an error
            }
        };

        fetchStories();
    }, []);

    const handleFilterChange = (e) => {
        const selectedCategory = e.target.value;
        setFilter(selectedCategory);
        applyFilters(selectedCategory, searchQuery);
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        applyFilters(filter, query);
    };

    const applyFilters = (category, query) => {
        let filtered = stories;

        if (category) {
            filtered = filtered.filter(story => story.category.toLowerCase() === category.toLowerCase());
        }

        if (query) {
            filtered = filtered.filter(story =>
                (story.title && story.title.toLowerCase().includes(query.toLowerCase())) ||
                (story.content && story.content.toLowerCase().includes(query.toLowerCase()))
            );
        }

        setFilteredStories(filtered);
        setCurrentPage(1); // Reset current page when filter or search changes
    };

    const gridTemplateColumns = useBreakpointValue({
        base: '1fr', // 1 card on mobile view
        md: 'repeat(2, 1fr)', // 2 cards on tablet view
        lg: 'repeat(3, 1fr)', // 3 cards on laptop view
        xl: 'repeat(4, 1fr)', // 4 cards on desktop view
    });

    // Pagination
    const totalItems = filteredStories.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <Box p={4} mt={5}>
            <Heading as="h1" mb={4}>Stories</Heading>
            <Flex flexDir={["column", "column", "row"]} justify={"space-between"}>
                <Select placeholder="Filter by category" value={filter} onChange={handleFilterChange} mb={4} width={["250px", "300px"]}>
                    <option value="Fiction">Fiction</option>
                    <option value="Non-fiction">Non-fiction</option>
                    <option value="Poetry">Poetry</option>
                    <option value="Science">Science</option>
                    <option value="History">History</option>
                    <option value="fantasy">Fantasy</option>
                    <option value="mystery">Mystery</option>
                    <option value="Mythology">Mythology</option>
                </Select>
                <Input
                    placeholder="Search stories..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    mb={4}
                    width={["250px", "300px"]}
                />
            </Flex>
            <Grid templateColumns={gridTemplateColumns} gap={6} mt={5}>
                {loading ? (
                    Array.from({ length: itemsPerPage }).map((_, index) => (
                        <Box key={index} p={4} borderWidth="1px" borderRadius="md" boxShadow="md">
                            <Skeleton height="200px" mb={4} />
                            <Skeleton height="20px" mb={2} />
                            <Skeleton height="20px" mb={2} width="50%" />
                            <Skeleton height="40px" />
                        </Box>
                    ))
                ) : (
                    filteredStories
                        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                        .map(story => (
                            <StoryCard key={story.id} story={story} />
                        ))
                )}
            </Grid>
            {/* Pagination buttons */}
            <Box mt={8} mb={8} textAlign="center">
                <Button onClick={() => paginate(1)} mr={2} disabled={currentPage === 1}>
                    First
                </Button>
                {pageNumbers.map(number => (
                    <Button
                        key={number}
                        onClick={() => paginate(number)}
                        mr={2}
                        colorScheme={currentPage === number ? 'blue' : 'gray'}
                    >
                        {number}
                    </Button>
                ))}
                <Button onClick={() => paginate(totalPages)} ml={2} disabled={currentPage === totalPages}>
                    Last
                </Button>
            </Box>
        </Box>
    );
};

export default StoriesPage;
