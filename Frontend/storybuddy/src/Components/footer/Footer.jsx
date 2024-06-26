import {
    Box,

    Stack,
    Button,
    Container,
    SimpleGrid,
    Heading,
    useColorModeValue,

} from "@chakra-ui/react";

import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
    const bg = useColorModeValue("gray.100", "gray.800");
    return (
        <Box w="100%" p={4} background={bg}  >


            <Stack
                direction={"row"}
                marginTop={"30px"}
                justifyContent={"center"}
                spacing={6}
            >
                <Button label={"Twitter"} href={"#"}>
                    <FaTwitter color="#169bef" />
                </Button>
                <Button label={"YouTube"} href={"#"}>
                    <FaYoutube color="red" />
                </Button>
                <Button label={"Instagram"} href={"#"}>
                    <FaInstagram color="red" />
                </Button>
            </Stack>

            {/* footer column */}
            <Container as={Stack} maxW={"6xl"} py={10}>
                <SimpleGrid columns={{ base: 2, sm: 3, md: 6 }} spacing={7}>
                    <Stack align={"flex-start"}>
                        <Heading fontSize={"xl"} >
                            Story Buddy
                        </Heading>
                        <Box as="a" href="#inner-link">
                            {" "}
                            Story idea
                        </Box>
                        <Box as="a" href="#inner-link">
                            {" "}
                            About us
                        </Box>
                        <Box as="a" href="#inner-link">
                            {" "}
                            The Team
                        </Box>
                        <Box as="a" href="#inner-link">
                            Press
                        </Box>
                        <Box as="a" href="#inner-link">
                            {" "}
                            Careers
                        </Box>
                        <Box as="a" href="#inner-link">
                            {" "}
                            Contact Us
                        </Box>
                    </Stack>
                    <Stack align={"flex-start"}>
                        <Heading fontSize={"xl"} >
                            Customer Care{" "}
                        </Heading>
                        <Box as="a" href="#inner-link">
                            {" "}
                            FAQs
                        </Box>
                        <Box as="a" href="#inner-link">
                            {" "}
                            geography
                        </Box>
                        <Box as="a" href="#inner-link">
                            {" "}
                            Terms Of use
                        </Box>
                        <Box as="a" href="#inner-link">
                            Privacy Policy
                        </Box>
                        <Box as="a" href="#inner-link">
                            {" "}
                            Science
                        </Box>
                    </Stack>
                    <Stack align={"flex-start"}>
                        <Heading fontSize={"xl"} >
                            History
                        </Heading>
                        <Box as="a" href="#inner-link">
                            {" "}
                            Trade Program
                        </Box>
                    </Stack>
                    <Stack align={"flex-start"}>
                        <Heading fontSize={"xl"} >
                            Read story
                        </Heading>
                        <Box as="a" href="#inner-link">
                            {" "}
                            Profile
                        </Box>
                        <Box as="a" href="#inner-link">
                            {" "}
                            Blog
                        </Box>
                    </Stack>
                    <Stack align={"flex-start"}>
                        <Heading fontSize={"xl"} >
                            Discover
                        </Heading>
                        <Box as="a" href="#inner-link">
                            {" "}
                            Thealer
                        </Box>
                        <Box as="a" href="#inner-link">
                            {" "}
                            Childreen choice
                        </Box>
                        <Box as="a" href="#inner-link">
                            {" "}
                            Animal story
                        </Box>
                        <Box as="a" href="#inner-link">
                            Story &nbsp;Social
                        </Box>
                        <Box as="a" href="#inner-link">
                            {" "}
                            Galleries
                        </Box>
                        <Box as="a" href="#inner-link">
                            {" "}
                            Collections
                        </Box>
                        <Box as="a" href="#inner-link">
                            {" "}
                            Events
                        </Box>
                    </Stack>
                    <Stack align={"flex-start"}>
                        <Heading fontSize={"xl"} >
                            Genree
                        </Heading>
                        <Box as="a" href="#inner-link">
                            {" "}
                            Sky-fi
                        </Box>
                        <Box as="a" href="#inner-link">
                            {" "}
                            Physics storys
                        </Box>
                        <Box as="a" href="#inner-link">
                            {" "}
                            Fetures and Interviews
                        </Box>
                        <Box as="a" href="#inner-link">
                            {" "}
                            Story Social
                        </Box>
                        <Box as="a" href="#inner-link">
                            {" "}
                            Horror Story
                        </Box>
                    </Stack>
                </SimpleGrid>
            </Container>
        </Box>
    );
};

export default Footer;
