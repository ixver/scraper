import {useState, useEffect, useContext, useCallback} from "react";
import NextLink from "next/link";
import {useRouter} from "next/router";

import {Container, Flex, Text, Box, Spacer, Button, Heading, Image, useColorModeValue} from "@chakra-ui/react";

import {updateDoc, doc, getDoc} from "firebase/firestore";

import {ThemeToggleButton} from "./Buttons";
import AccountControls from "./AccountControls";
import {NewspaperIcon} from "../Icons";

import UserInfoSection from "../news/UserInfoSection";
import {getAuthUser, signInWithGoogle} from "../Auths";

import {firestoreDb as db} from "../../models/firebase/config";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";

import {useAccountUpdate} from "../Contexts";

import {useAccount} from "../Contexts";
const Header = () => {
	const accounttogglestate = useAccount();
	const router = useRouter();
	const auth = getAuth();
	const [user] = useAuthState(auth);
	const [accountstart, setaccountstart] = useState();
	const [userstatus, setuserstatus] = useState();
	const [callstotal, setcallstotal] = useState(0);
	const handleaccounttoggle = useAccountUpdate();

	const loadUserData = () => {
		user &&
			user.uid &&
			getDoc(doc(db, "scrapeRequests", user.uid)).then((data) => {
				setcallstotal(data.data().callstotal);
				setuserstatus(data.data().status);
				setaccountstart(data.data().accountCreatedAt.toDate().toDateString());
			});
	};
	loadUserData();
	useEffect(() => {
		loadUserData();
	}, [accounttogglestate]);

	const saveUserstatus = (statusType) => {
		const decRef = doc(db, "scrapeRequests", user.uid);
		const newFields = {status: statusType};
		updateDoc(decRef, newFields).then(() => {
			console.log(`status updated as ${statusType}`);
			loadUserData();
			handleaccounttoggle();
		});
	};

	const resetCallstotal = () => {
		updateDoc(doc(db, "scrapeRequests", user.uid), {
			callstotal: 0,
		}).then(() => {
			// console.log("reset total calls");
			loadUserData();
		});
	};

	const subscribeUser = () => {
		saveUserstatus("member");
		resetCallstotal();
	};

	const unsubscribeUser = () => {
		saveUserstatus("canceled");
	};

	const colorSchemeA = useColorModeValue("dark", "light");
	const modeTextColor = useColorModeValue("white", "white");
	return (
		<Box py={4} bg="black" pb={0}>
			<Container maxW="container.xl">
				{/* layout */}
				<Flex direction={{base: ["column"], sm: ["row"]}} align="center">
					<Box order={{base: 2, sm: 2}}>
						<Button variant="link" borderWidth=".28vh" color={modeTextColor} my="2vh">
							<NewspaperIcon />
							<Text ml="1vh">NEWS SCRAPES</Text>
						</Button>
					</Box>

					<Spacer order={{base: 3, sm: 3}} flex={1} />

					<ThemeToggleButton order={{base: 5, sm: 4}} />
					<Box order={{base: 4, sm: 5}}>
						<AccountControls />
					</Box>
				</Flex>
				{/*  */}
			</Container>
			{user && user.uid ? (
				// MEMBER SECTION, USER INFo
				<Container maxW="container.xl" p={0}>
					<UserInfoSection
						user={user}
						callstotal={callstotal}
						userstatus={userstatus}
						accountstart={accountstart}
						subscribeUser={(e) => subscribeUser(e)}
						unsubscribeUser={(e) => unsubscribeUser(e)}
					/>
				</Container>
			) : (
				// PUBLIC SECTION, SHOWCASE INFO
				<Box pb="2vh" pt="16vh">
					<Image src="b.png" alt="bgb" position="absolute" h="auto" w="68vh" top="6vh" left="50%" transform="translateX(-50%)" />
					<Flex direction={["column"]} alignItems="center" mb="4rem" zindex={1}>
						<Flex direction={["column"]} alignItems="center">
							<Box p={0} m={0} mb="4vh" minH="28vh"></Box>
							<Heading fontFamily="poppins.800" mb={11} fontSize="4.4vh" color="white">
								NEWS SCRAPES
							</Heading>
							<Text maxW="22rem" align="center" lineHeight="2.2rem" mb="1.1rem" color="white">
								Scrapes for news articles.
							</Text>
							<Button
								variant="outline"
								// colorScheme={color ? "brandCLight" : ""}
								color="white"
								borderWidth=".28vh"
								borderColor="white"
								letterSpacing=".1rem"
								aria-label="login"
								onClick={signInWithGoogle}
							>
								SIGNUP!
							</Button>
						</Flex>
					</Flex>
				</Box>
			)}
		</Box>
	);
};

export default Header;
