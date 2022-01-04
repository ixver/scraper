import React, {useState, useEffect, useRef} from "react";

import {Flex, Grid, GridItem, Box, ButtonGroup, Spacer, Button, Heading, Text, SkeletonText, Divider, useColorModeValue} from "@chakra-ui/react";
import {AnimatePresence, motion} from "framer-motion";
const UserInfoSection = ({user, userstatus, callstotal, accountstart, subscribeUser, unsubscribeUser}) => {
	const [showSplash, setShowSplash] = useState(true);
	useEffect(() => {
		setTimeout(() => {
			setShowSplash(false);
		}, 2800);
	}, []);

	const modeTextColor = useColorModeValue("white", "white");
	return (
		user &&
		user.uid && (
			<AnimatePresence>
				<motion.div exit={{x: "-88vh"}}>
					<Box>
						{/* SECTION */}
						<Heading fontSize="4vh" fontFamily="poppins.800" textAlign={{base: "center", lg: "right"}} mt="4.8vh" mb="2.8vh" color={modeTextColor}>
							WELCOME {user.displayName}!
						</Heading>
						{/* SECTION */}
						{userstatus == "member" ? (
							<Flex direction={{base: ["column"], lg: ["row"]}} alignItems="center" justify="space-between" color={modeTextColor}>
								<Flex direction={{base: ["column"], lg: ["row"]}} alignItems="center">
									<Text mx="2vh" my="1vh">
										Max Requests: 10
									</Text>
									<Text mx="2vh" my="1vh">
										Total Requests: {callstotal}
									</Text>
								</Flex>
								<Flex direction={{base: ["column"], lg: ["row"]}} alignItems="center">
									<Text mx="2vh" my="1vh">
										Member Since {accountstart && accountstart}
									</Text>
									<Button variant="outline" borderColor="rgba(0,0,0,0)" onClick={unsubscribeUser} colorScheme="pink">
										Cancel Subscription
									</Button>
								</Flex>
							</Flex>
						) : (
							<Flex direction={{base: ["column"], lg: ["row"]}} alignItems="center" justify="space-between">
								<Flex></Flex>
								<Flex direction={{base: ["column"], lg: ["row"]}} alignItems="center">
									<Text mx="2vh" my="1vh" color={modeTextColor}>
										Become a member!
									</Text>
									<Spacer flex={1} />
									<Button variant="outline" colorScheme="pink" onClick={subscribeUser}>
										Subscribe
									</Button>
								</Flex>
							</Flex>
						)}
						<Divider mt="4vh" />{" "}
					</Box>
				</motion.div>
			</AnimatePresence>
		)
	);
};

export default UserInfoSection;
