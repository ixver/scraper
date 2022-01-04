import React, {useState, useEffect, useContext} from "react";
import NextLink from "next/link";

import {Text, LinkOverlay, Button, IconButton, Tooltip, useColorModeValue} from "@chakra-ui/react";
import {MdTransitEnterexit} from "react-icons/md";

import {getAuthUser, signInWithGoogle} from "../Auths";

const AccountControls = () => {
	const {auth, user} = getAuthUser();
	const modeTextColor = useColorModeValue("white", "black");
	return user && user.uid ? (
		// auth.currentUser && (
		<Tooltip label="Logout" placement="top" hasArrow>
			<IconButton
				aria-label="logout"
				icon={<MdTransitEnterexit fontSize="2.8rem" />}
				onClick={(e) => auth.signOut(e)}
				colorScheme={modeTextColor}
				color="white"
				_hover={{color: "black", bg: "white"}}
			/>
		</Tooltip>
	) : (
		<Button variant="outline" borderWidth=".28vh" color="white" borderColor="white" aria-label="login" onClick={(e) => signInWithGoogle(e)}>
			LOGIN
		</Button>
	);
};

export default AccountControls;
