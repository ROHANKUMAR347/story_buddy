import { useState, useEffect } from "react";
import {
    Box,
    FormControl,
    FormLabel,

    Button,
    Text,
    Heading,

    IconButton,
    Stack,
    Tooltip,
    Spinner,
    VStack,
    Flex,
    Spacer,
    Textarea,
    useToast,
    useColorModeValue,
} from "@chakra-ui/react";
import { FiVolume2, FiVolumeX } from "react-icons/fi";
import axios from "axios";

const Story = () => {
    const [story, setStory] = useState("");
    const [instructions, setInstructions] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [moral, setMoral] = useState("");
    const [error, setError] = useState(null);
    const toast = useToast();

    useEffect(() => {
        return () => {
            stopSpeaking();
        };
    }, []);

    useEffect(() => {
        if (story) {
            const derivedMoral = deriveMoralFromStory(story);
            setMoral(derivedMoral);
        }
    }, [story]);

    const deriveMoralFromStory = (storyText) => {
        const sentences = storyText.split(".");
        const relevantPhrases = [
            "moral of the story",
            "lesson learned",
            "moral lesson",
            "moral:",
            "lesson:",
            "moral is",
            "lesson is",
        ];

        for (let sentence of sentences) {
            for (let phrase of relevantPhrases) {
                if (sentence.toLowerCase().includes(phrase)) {
                    return sentence.trim();
                }
            }
        }

        return "No specific moral found.";
    };

    const generateStory = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const apiKey = "382o0ac2c14btd9435906fb13df381eb";
        const prompt = `User instructions: generate a story about ${instructions}`;
        const context =
            "You are a story expert and love to write stories. Your mission is to generate a story covering educational topics such as science, history, geography, and more. Incorporate moral lessons and character development. Encourage creative writing exercises and allow children to contribute to story creation. Provide bedtime story recommendations tailored to children's interests.";
        const apiURL = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(
            prompt
        )}&context=${encodeURIComponent(context)}&key=${apiKey}`;

        try {
            const response = await axios.get(apiURL);
            const generatedStory = Array.isArray(response.data.answer)
                ? response.data.answer.join("<br>")
                : response.data.answer;
            setStory(generatedStory);
            setError(null);
        } catch (error) {
            setError("Error fetching story. Please try again later.");
            toast({
                title: "Error",
                description: "Failed to generate story. Please try again later.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
        setIsLoading(false);
    };

    const speakStory = () => {
        stopSpeaking();
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(story.replace(/<br\s*\/?>/gi, '\n'));
            utterance.onend = () => setIsSpeaking(false);
            speechSynthesis.speak(utterance);
            setIsSpeaking(true);
        } else {
            alert("Sorry, your browser doesn't support text-to-speech.");
        }
    };

    const stopSpeaking = () => {
        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    };

    const generateNewStory = () => {
        setStory("");
        setInstructions("");
    };

    const generateAnotherStory = (event) => {
        event.preventDefault();
        generateStory(event);
    };
    const bg = useColorModeValue("gray.100", "gray.800");
    return (
        <Box p={4} minHeight={"600px"} background={bg} boxShadow={"inherit"}>
            <Box textAlign="center">
                <Heading mb={4} color={"teal"}>Story Generator</Heading>
                <form onSubmit={generateStory}>
                    <VStack spacing={4} alignItems="center">
                        <FormControl id="user-instructions" p={6}>
                            <FormLabel>Enter Instructions</FormLabel>
                            <Textarea
                                value={instructions}
                                onChange={(e) => setInstructions(e.target.value)}
                                required
                                placeholder="Write instructions here..."
                                resize="none"
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            colorScheme="teal"
                            isLoading={isLoading}
                            loadingText="Generating..."
                            disabled={isLoading}

                        >
                            {isLoading ? "Generating..." : "Generate Story"}
                        </Button>
                    </VStack>
                </form>

                {error && (
                    <Box mt={4}>
                        <Text color="red.500">{error}</Text>
                    </Box>
                )}

                {isLoading ? (
                    <Spinner size="lg" mt={8} />
                ) : (
                    story && (
                        <VStack align="start" spacing={4} mt={8}>
                            <Box w="100%" p={5}>
                                <Heading size="md">Generated Story</Heading>
                                <Text mt={2} whiteSpace="pre-wrap">
                                    {story}
                                </Text>
                                <Flex mt={4}>
                                    <Spacer />
                                    <Stack direction="row" spacing={4}>
                                        <Tooltip label={isSpeaking ? "Stop Speaking" : "Speak Story"}>
                                            <IconButton
                                                icon={isSpeaking ? <FiVolumeX /> : <FiVolume2 />}
                                                colorScheme="teal"
                                                aria-label={isSpeaking ? "Stop Speaking" : "Speak Story"}
                                                onClick={isSpeaking ? stopSpeaking : speakStory}
                                                isDisabled={!story}
                                            />
                                        </Tooltip>
                                        <Button onClick={(e) => generateAnotherStory(e)} colorScheme="teal" variant="outline">
                                            Another Story
                                        </Button>
                                        <Button onClick={() => generateNewStory()} colorScheme="teal" variant="outline">
                                            New Story
                                        </Button>
                                    </Stack>
                                </Flex>
                            </Box>
                            {moral && (
                                <Box w="100%">
                                    <Heading size="md">Moral of the Story</Heading>
                                    <Text mt={2}>{moral}</Text>
                                </Box>
                            )}
                        </VStack>
                    )
                )}
            </Box>
        </Box>
    );
};

export default Story;
