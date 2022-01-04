import React, {useState, useEffect} from "react";
import NextLink from "next/link";
import {getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInAnonymously, onAuthStateChanged} from "firebase/auth";

import {Text, LinkOverlay, Button, IconButton, Tooltip, useColorModeValue} from "@chakra-ui/react";
import {motion} from "framer-motion";
// import { RiAccountCircleFill } from "react-icons/ri";
import {LoginIcon} from "./Icons";

import {useAuthState} from "react-firebase-hooks/auth";

const signInWithGoogle = () => {
	const provider = new GoogleAuthProvider();
	signInWithPopup(auth, provider)
		.then((result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential.accessToken;
			// The signed-in user info.
			const user = result.user;

			// ...
		})
		.catch((error) => {
			// // Handle Errors here.
			// const errorCode = error.code;
			// const errorMessage = error.message;
			// // The email of the user's account used.
			// const email = error.email;
			// // The AuthCredential type that was used.
			// const credential = GoogleAuthProvider.credentialFromError(error);
			// // ...
		});
};

const LoginButton = () => {
	const auth = getAuth();
	return (
		<Tooltip label="Login" placement="top" hasArrow>
			<IconButton aria-label="login" icon={<LoginIcon />} onClick={signInWithGoogle} colorScheme={useColorModeValue("bodyDark", "bodyLight")} />
		</Tooltip>
	);
};

export default LoginButton;
