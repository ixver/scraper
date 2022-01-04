import React, {useState, useEffect} from "react";

import {Container, Box, Image} from "@chakra-ui/react";

import RequestForm from "../components/news/RequestForm";

import {firestoreDb as db} from "../models/firebase/config";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";

import {AnimatePresence, motion} from "framer-motion";

export default function Home() {
	const auth = getAuth();
	const [user] = useAuthState(auth);

	const containerAnimateVariants = {
		exit: {
			opacity: 0,
			y: -200,
			transition: {
				ease: "easeOut",
				duration: 0.8,
			},
		},
	};
	return (
		user &&
		user.uid && (
			<Box>
				<AnimatePresence>
					<motion.div variants={containerAnimateVariants} exit="exit">
						<Box pt="8vh">
							<Container maxW="container.xl">
								<RequestForm />
							</Container>
						</Box>
					</motion.div>
				</AnimatePresence>
			</Box>
		)
	);
}
