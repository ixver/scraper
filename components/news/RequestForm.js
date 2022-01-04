import React, {useState, useEffect, useContext} from "react";

import {Flex, Box, Link, Alert, Input, Button, Heading, Text, Divider, TagLabel, TagCloseButton, useColorModeValue, Spinner} from "@chakra-ui/react";
import {RiAddFill} from "react-icons/ri";
import {RiSubtractFill} from "react-icons/ri";
import {motion} from "framer-motion";

import {firestoreDb as db} from "../../models/firebase/config";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import axios from "axios";
import {
	getFirestore,
	collection,
	getDoc,
	getDocs,
	setDoc,
	addDoc,
	updateDoc,
	deleteDoc,
	doc,
	increment,
	query,
	serverTimestamp,
	orderBy,
	limit,
	where,
	onSnapshot,
} from "firebase/firestore";
import {useAccount, useAccountUpdate} from "../Contexts";

const RequestForm = ({toggleAccount}) => {
	const auth = getAuth();
	const [user] = useAuthState(auth);
	const [accountstart, setaccountstart] = useState();
	const [userstatus, setuserstatus] = useState();
	const [callstotal, setcallstotal] = useState(0);
	const [topicVal, setTopicVal] = useState("");
	const [sourcesList, setSourcesList] = useState([]);
	const [scraperesults, setScraperesults] = useState();
	const [isLoading, setIsLoading] = useState(false);
	let [sourcesFilterList, setSourcesFilterList] = useState([]);
	const userCallsMax = 10;
	const accounttogglestate = useAccount();
	const handleaccounttoggle = useAccountUpdate();
	let sourceName;
	const sourcesArr = {
		Time: "https://time.com/",
		"Scientific American": "https://www.scientificamerican.com/",
		Vice: "https://www.vice.com/en",
		"The Wallstreet Journal": "https://www.wsj.com/",
	};
	const sourcesPrependArr = {
		Time: "",
		"Scientific American": "",
		Vice: "https://www.vice.com",
		"The Wallstreet Journal": "",
	};

	const loadSources = () => {
		const q = query(collection(db, "scrapeRequests", user.uid, "sources"));
		getDocs(q)
			.then((data) => {
				return data.docs.map((d) => {
					return d.data().url;
				});
			})
			.then((dataloaded) => {
				setSourcesList(dataloaded);
			});
	};
	const sendCallRequest = async (e) => {
		e.preventDefault();
		if (callstotal <= userCallsMax) {
			e.preventDefault();
			// RUN SCRAPE FUNCTION
			setIsLoading(true);

			axios({
				method: "post",
				url: "http://localhost:3000/api/news",
				data: {
					sites: sourcesList,
					topic: topicVal,
				},
			}).then((result) => {
				// console.log("result check", result);
				setScraperesults(result.data);

				incrementCallstotal();
				setIsLoading(false);
				loadUserData();
				handleaccounttoggle();
			});
		} else {
			alert("You have reached the max total calls on your subscription. There are no upgrade options so just cancel and resubscribe to reset to 0.");
		}
	};
	const incrementCallstotal = () => {
		const decRef = doc(db, "scrapeRequests", user.uid);
		const newFields = {
			callstotal: callstotal + 1,
		};
		updateDoc(decRef, newFields).then(() => {
			loadUserData();
		});
	};

	const resetRequestform = () => {
		// console.log("FORM RESET");
		auth = null;
		setSourcesList([]);
	};

	const resetUserData = () => {
		setcallstotal(null);
		setScraperesults();
	};
	const loadUserData = () => {
		user &&
			user.uid &&
			getDoc(doc(db, "scrapeRequests", user.uid)).then((data) => {
				setcallstotal(data.data().callstotal);
				setuserstatus(data.data().status);
				setaccountstart(data.data().accountCreatedAt.toDate().toDateString());
			});
	};

	const appendSource = async (srcname) => {
		const data = {url: sourcesArr[srcname]};
		setDoc(doc(db, "scrapeRequests", user.uid, "sources", srcname), data).then(() => {
			loadSources();
			handleaccounttoggle();
		});
	};

	const removeSource = async (srcname) => {
		deleteDoc(doc(db, "scrapeRequests", user.uid, "sources", srcname)).then(() => {
			loadSources();
			handleaccounttoggle();
		});
	};

	const handleSearchSubmit = (e) => {
		e.preventDefault();
		sendCallRequest(e);
	};

	const handleFilterToggle = (e) => {
		sourceName = e.target.value;
		if (sourcesList.includes(sourcesArr[sourceName])) {
			removeSource(sourceName);
		} else {
			appendSource(sourceName);
		}
	};

	useEffect(() => {
		// console.log("check user", user);
		loadUserData();
		if (user && user.uid) {
			loadSources();
			if (userstatus != "member") {
				resetRequestform();
			}
		} else {
			console.log("user signed out");
			resetUserData();
			resetRequestform();
		}
	}, [auth, user, accounttogglestate]);

	const animationVariants = {
		hover: {
			boxShadow: "0px 0px 0px 1.6vh rgb(0, 0, 0)",
			transition: {
				duration: 0.2,
				ease: "easeOut",
				type: "spring",
				stiffness: 160,
			},
		},
		click: {
			boxShadow: "0px 0px 0px .28vh rgb(0, 0, 0)",
		},
	};
	const textAreasBg = useColorModeValue("bodyDark2nd", "bodyLight2nd");
	const textAreasClr = useColorModeValue("bodyLight2nd", "bodyDark2nd");
	const textAreasBdr = useColorModeValue("bodyDark2nd", "bodyLight2nd");
	const textAreasHvrBdr = useColorModeValue("bodyLight", "bodyDark");
	const modeArticleClr = useColorModeValue("gray.700", "gray.200");
	const modeCardTextClr = useColorModeValue("gray.400", "gray.600");

	return (
		<Box>
			<Flex direction={["column"]} w="100%" mb="8vh">
				{/* <Flex direction={["column"]} order={{base: 1, lg: 2}}> */}
				<Heading variant="worksample-title" as="h3" mb="2vh" textAlign={{base: "center", lg: "left"}} fontSize="3vh">
					SEARCH
				</Heading>

				{/* AREA */}
				<Flex direction={{base: ["column"], lg: ["row"]}} alignContent="center" alignItems="center" w="100%">
					<Flex alignItems="center" justify={{base: "center", lg: "start"}} w="100%" wrap="wrap" mb={{base: "2.6vh", lg: 0}}>
						{Object.keys(sourcesArr).map((k, i) => {
							return (
								<Text
									as="button"
									backgroundColor="rgba(1,1,1,0)"
									borderWidth=".17vh"
									borderColor={sourcesList.includes(sourcesArr[k]) ? "blue.600" : "gray.600"}
									key={i}
									value={k}
									px=".8vh"
									p6="1.4vh"
									mx=".6vh"
									my=".4vh"
									onClick={(e) => handleFilterToggle(e)}
								>
									{k}
								</Text>
							);
						})}
					</Flex>
					{sourcesList.length == 0 && (
						<Box bg="red.600" fontWeight="semibold" fontSize="2vh" color="white" px="3vh" py=".8vh" mx=".8vh">
							Choose a tag
						</Box>
					)}
					<Flex minW={{base: "33vh", md: "33vh"}} alignItems="center">
						<Input
							variant="outline"
							borderWidth=".28vh"
							borderRadius="0"
							fontSize="2vh"
							px="3vh"
							py="2.2vh"
							textAlign={{base: "center", lg: "left"}}
							// variant="worksample-item-description"
							value={topicVal}
							onChange={(e) => setTopicVal(e.target.value)}
							type="topic"
							placeholder="Search Topic"
							color={textAreasClr}
							borderColor={textAreasBdr}
							_hover={{borderColor: textAreasHvrBdr}}
						/>
						{userstatus == "member" ? (
							<Button
								px="3.6vh"
								py="2.6vh"
								variant="solid"
								fontSize="2vh"
								colorScheme="pink"
								onClick={(e) => handleSearchSubmit(e)}
								disabled={!sourcesList || sourcesList.length == 0 || !user || !topicVal || isLoading || !userstatus == "member"}
							>
								Get Articles
							</Button>
						) : (
							<Button px="3.6vh" py="2.6vh" variant="solid" fontSize="2vh" colorScheme="pink" disabled={true}>
								Get Articles
							</Button>
						)}
					</Flex>
				</Flex>
			</Flex>
			<Flex direction={["column"]} w="100%" mb="4vh" minH="33vh">
				<Heading variant="worksample-title" as="h3" mb="2.6vh" textAlign={{base: "center", lg: "left"}} fontSize="3vh">
					RESULTS
				</Heading>
				{/* AREA */}

				<Box>
					{isLoading ? (
						<Flex direction={["column"]} align={{base: "center"}} justify={{base: "center"}}>
							<Spinner size="2xl" />
							<Text>LOADING...</Text>
						</Flex>
					) : scraperesults && scraperesults.length > 0 ? (
						<Flex direction={["column"]} w="auto" alignItems={{base: "center", lg: "start"}}>
							<Text mb="2vh">{scraperesults.length} RESULTS</Text>
							<Flex direction={["row"]} wrap="wrap" justify="start" gap="2.2vh" w="auto" alignItems="center">
								{scraperesults.map((article, i) => {
									return (
										<Flex
											direction={["column"]}
											key={i}
											h="33vh"
											minW={{base: "24vh"}}
											maxW={{base: "24vh"}}
											bg={modeArticleClr}
											px="2vh"
											pt="3vh"
											pb="1vh"
										>
											<Heading fontSize="2vh" mb="1.1vh" fontFamily="controlsFont">
												<Link href={sourcesPrependArr[article.srcname] + article.url} _target="_blank">
													{article.title.length > 68 ? article.title.substring(0, 68) : article.title.substring(0, 68)}
													{article.title.length > 68 && <>...</>}
												</Link>
											</Heading>
											<Divider mb=".8vh" />
											<Text fontSize="1.7vh" fontFamily="textsFont" overflow="hidden" mb="1vh" color={modeCardTextClr}>
												{article.text}
											</Text>
											<Text fontSize="1.4vh" fontFamily="textsFont" textAlign="right" color={modeCardTextClr}>
												-&nbsp;{article.srcname}
											</Text>
										</Flex>
									);
								})}
							</Flex>
						</Flex>
					) : (
						<Text textAlign={{base: "center", lg: "left"}}>0 RESULTS</Text>
					)}
				</Box>
			</Flex>
		</Box>
	);
};

export default RequestForm;
