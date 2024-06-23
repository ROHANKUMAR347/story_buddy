import {
    Box,
    Text,
    Input,
    Stack,
    Button,
    Container,
    SimpleGrid,
    Heading,

} from "@chakra-ui/react";

import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        <Box w="100%" p={4} color="white" >


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
                        <Heading fontSize={"xl"} color={"#1e0e00"}>
                            Story Buddy
                        </Heading>
                        <Box as="a" color="#685253" href="#inner-link">
                            {" "}
                            Story idea
                        </Box>
                        <Box as="a" color="#685253" href="#inner-link">
                            {" "}
                            About us
                        </Box>
                        <Box as="a" color="#685253" href="#inner-link">
                            {" "}
                            The Team
                        </Box>
                        <Box as="a" color="#685253" href="#inner-link">
                            Press
                        </Box>
                        <Box as="a" color="#685253" href="#inner-link">
                            {" "}
                            Careers
                        </Box>
                        <Box as="a" color="#685253" href="#inner-link">
                            {" "}
                            Contact Us
                        </Box>
                    </Stack>
                    <Stack align={"flex-start"}>
                        <Heading fontSize={"xl"} color={"#1e0e00"}>
                            Customer Care{" "}
                        </Heading>
                        <Box as="a" color="#685253" href="#inner-link">
                            {" "}
                            FAQs
                        </Box>
                        <Box as="a" color="#685253" href="#inner-link">
                            {" "}
                            geography
                        </Box>
                        <Box as="a" color="#685253" href="#inner-link">
                            {" "}
                            Terms Of use
                        </Box>
                        <Box as="a" color="#685253" href="#inner-link">
                            Privacy Policy
                        </Box>
                        <Box as="a" color="#685253" href="#inner-link">
                            {" "}
                            Science
                        </Box>
                    </Stack>
                    <Stack align={"flex-start"}>
                        <Heading fontSize={"xl"} color={"#1e0e00"}>
                            History
                        </Heading>
                        <Box as="a" color="#685253" href="#inner-link">
                            {" "}
                            Trade Program
                        </Box>
                    </Stack>
                    <Stack align={"flex-start"}>
                        <Heading fontSize={"xl"} color={"#1e0e00"}>
                            Read story
                        </Heading>
                        <Box as="a" color="#685253" href="#inner-link">
                            {" "}
                            Profile
                        </Box>
                        <Box as="a" color="#685253" href="#inner-link">
                            {" "}
                            Blog
                        </Box>
                    </Stack>
                    <Stack align={"flex-start"}>
                        <Heading fontSize={"xl"} color={"#1e0e00"}>
                            Discover
                        </Heading>
                        <Box as="a" color="#685253" href="#inner-link">
                            {" "}
                            Thealer
                        </Box>
                        <Box as="a" color="#685253" href="#inner-link">
                            {" "}
                            Childreen choice
                        </Box>
                        <Box as="a" color="#685253" href="#inner-link">
                            {" "}
                            Animal story
                        </Box>
                        <Box as="a" color="#685253" href="#inner-link">
                            Story &nbsp;Social
                        </Box>
                        <Box as="a" color="#685253" href="#inner-link">
                            {" "}
                            Galleries
                        </Box>
                        <Box as="a" color="#685253" href="#inner-link">
                            {" "}
                            Collections
                        </Box>
                        <Box as="a" color="#685253" href="#inner-link">
                            {" "}
                            Events
                        </Box>
                    </Stack>
                    <Stack align={"flex-start"}>
                        <Heading fontSize={"xl"} color={"#1e0e00"}>
                            Genree
                        </Heading>
                        <Box as="a" color="#685253" href="#inner-link">
                            {" "}
                            Sky-fi
                        </Box>
                        <Box as="a" color="#685253" href="#inner-link">
                            {" "}
                            Physics storys
                        </Box>
                        <Box as="a" color="#685253" href="#inner-link">
                            {" "}
                            Fetures and Interviews
                        </Box>
                        <Box as="a" color="#685253" href="#inner-link">
                            {" "}
                            Story Social
                        </Box>
                        <Box as="a" color="#685253" href="#inner-link">
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
