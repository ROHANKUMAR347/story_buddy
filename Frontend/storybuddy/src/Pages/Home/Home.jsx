import { Box, Button, Circle, Flex, Heading, Image, Text, useColorModeValue } from "@chakra-ui/react"
import { motion } from 'framer-motion';

const MotionCircle = motion(Circle);

const Home = () => {
    const bg = useColorModeValue("gray.100", "gray.800");
    const circleVariants = {
        initial: { scale: 0.8, opacity: 0.8 },
        animate: { scale: 1, opacity: 1 },
        hover: { scale: 1.2 },
    };
    return (

        <Box background={bg} >

            <Box display={"flex"} flexDir={["column", "column", "row"]} p={4} justifyContent={"center"} alignItems={"center"} gap={10} fontWeight={500} >
                <Box display={"flex"} flexDir={"column"} gap={10}>
                    <Box display={"flex"} flexDir={"column"} gap={"10px"} textAlign={"start"}>
                        <Text fontFamily={"monospace"} color={"red"} fontSize={"25px"}>Welcome to Story Buddy!</Text>
                        <Text as={Heading} fontFamily={"cursive"} >
                            Unlock imagination through captivating tales.
                        </Text>
                        <Text color={"red"}>Share your unique storytelling voice.</Text>
                    </Box>
                    <Button width={"150px"} bg="red" borderRadius="10px" px="30px" py="15px" color="white" p={[4, 8]}>Learn More</Button>
                </Box>
                <Box>
                    <Image h={"100vh"} src="https://themewagon.github.io/kiddy/images/kid_transparent.png" alt="StoryBuddy Image" />
                </Box>

            </Box>

            <Box bg={bg} pl={10} pr={10} mt={6}>
                <Flex flexDir={"column"} alignItems="center" gap={4} textAlign={"center"}>
                    <Heading as="h1" fontSize={["20px", "25px", "35px"]} mt={6} mb={4}>
                        Nurturing Young Minds
                    </Heading>
                    <Text fontSize={["16px", "18px", "25px"]} mb={8} >
                        At Story Bot, we are dedicated to enriching the lives of children and families
                        through creative storytelling. Our platform supports mental wellness and learning
                        by fostering imagination and joy.
                    </Text>
                    <Text fontSize={["16px", "18px", "25px"]} mb={8} textAlign="center" whiteSpace="pre-wrap">
                        As a leading initiative in children&apos; mental health and education, we focus on three
                        core pillars to maximize our impact: Compassionate Care, Innovative Science, and
                        Engaging Education.
                    </Text>
                    <Flex
                        justifyContent="center"
                        alignItems="center"
                        w="full"
                        gap={6}
                        mt={8}
                        p={5}
                    >
                        {['History', 'Science', 'Education'].map((text, index) => (
                            <MotionCircle
                                key={text}
                                size={["80px", "120px", "160px"]}
                                bg={["purple.500", "orange.500", "teal.500"][index]}
                                color="white"
                                variants={circleVariants}
                                initial="initial"
                                animate="animate"
                                whileHover="hover"
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                {text}
                            </MotionCircle>
                        ))}
                    </Flex>
                    <Button
                        colorScheme="red"
                        size="lg"
                        mt={8}
                    >
                        Learn More
                    </Button>
                </Flex>
            </Box>
            <Box background={bg} display="flex" flexDir={["column", "column", "row"]} gap={5} p={8} >
                <Box display="flex" alignItems="center" justifyContent="center" width={["100%", "100%", "50%"]} >
                    <Image src="https://t4.ftcdn.net/jpg/02/82/73/11/360_F_282731179_RVTrSvnT3ado62ynbrh2XIuZvYnxQNri.jpg" alt="StoryBuddy Image" />
                </Box>

                <Box paddingTop={20} width={["100%", "100%", "50%"]}>
                    <Text fontFamily={'cursive'} fontSize={25} color={'red'}>About us</Text>
                    <Text fontSize="23px" fontWeight="bold" mb="20px">Explore the Magic of Storytelling</Text>
                    <Text fontSize="18px" mb="20px" color="rgba(0,0,0,0.6)">
                        Welcome to StoryBuddy, your child&apos ultimate storytelling companion! We believe in the power of stories to spark imagination, teach valuable lessons, and encourage creativity in children. Our mission is to create delightful and educational storytelling experiences that engage young readers in unique and interactive ways. Join us on this enchanting journey and watch your child&apos; imagination soar!
                    </Text>
                    <Button bg="red" borderRadius="10px" px="30px" py="15px" color="white" p={[4, 8]}>More About Us</Button>
                </Box>
            </Box>
            <Box display={"flex"} flexDir={["column", "row"]} justifyContent={"space-between"} pt={4} pl={"50px"} pr={"50px"} pb={4} alignItems={"center"} height={"150px"} backgroundColor={"yellow"}>
                <Box fontSize={"30px"} fontWeight={500}>Bring Fun Life To Your Kids</Box>
                <Box>
                    <Button bg="red" borderRadius="10px" px="30px" py="15px" color="white" p={[4, 8]}>GET STARTED</Button>
                </Box>
            </Box>

        </Box>
    )
}

export default Home