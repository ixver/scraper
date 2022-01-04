import NextLink from "next/link";
import {Box, Heading, Text, Container, Flex, Button, Divider} from "@chakra-ui/react";

const NotFound = () => {
	return (
		<Container maxW="container.xl">
			<Flex direction={["column"]} w="100%" minH="28vh" py="4vh">
				<Box w="100%" h="100%">
					<Heading as="h3" mb="2vh">
						Not found
					</Heading>
					<Text mb="2vh">The page you&apos;re looking for was not found.</Text>
				</Box>

				<Flex my={6} justify="center">
					<NextLink href="/">
						<Button colorScheme="black">Go Back</Button>
					</NextLink>
				</Flex>
			</Flex>
		</Container>
	);
};

export default NotFound;
