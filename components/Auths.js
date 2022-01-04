import React, {useState, useEffect} from "react";

import {getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInAnonymously, onAuthStateChanged} from "firebase/auth";
import {useAuthState as UseAuthState} from "react-firebase-hooks/auth";

export const getAuthUser = () => {
	const auth = getAuth();
	const [user] = UseAuthState(auth);
	return {auth, user};
};

export const signInWithGoogle = () => {
	const auth = getAuth();
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
