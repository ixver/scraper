import NextLink from "next/link";
import {useRouter} from "next/router";

import {Container, Flex, Grid, GridItem, Box, Text, Icon, useColorModeValue, Divider} from "@chakra-ui/react";
import {FooterNavButton, LinkButton, FooterTopNavButton} from "./typicals/Buttons";
import {GithubIcon, LinkedinIcon, MailIcon} from "./Icons";
const Footer = () => {
	const router = useRouter();
	let dividColor = useColorModeValue("rgb(222, 222, 222,1)", "rgb(44, 44, 44,1)");
	const colorScheme = useColorModeValue("dark", "light");
	const modeTextColor = useColorModeValue("white", "black");
	return (
		<Box variant="" id="Footer">
			<Container maxW="container.xl" centerContent>
				<Divider bg={dividColor} zIndex={0} style={{zIndex: 0}} mb="11vh" />
				<Grid templateColumns="repeat(12,1fr)" autoRows columnGap={{base: "2vh", md: "2vh"}} mb="4rem" w="100%" m="auto">
					<GridItem colSpan={{base: 12, md: 4}} mb="4.8rem"></GridItem>
					<GridItem colSpan={{base: 12, md: 8}} mb="4.8rem" color={modeTextColor}>
						<Text fontSize="1.6vh" mb="6.8rem" textAlign={{base: "center", md: "right"}}>
							Copyright &copy; 2021
						</Text>
					</GridItem>
				</Grid>
			</Container>
		</Box>
	);
};

export default Footer;
