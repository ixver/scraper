import React, {useState, useEffect, useRef} from "react";

import {
	Container,
	Box,
	SimpleGrid,
	Center,
	Spacer,
	VStack,
	HStack,
	Flex,
	Grid,
	GridItem,
	Button,
	IconButton,
	Heading,
	Text,
	Textarea,
	List,
	ListItem,
	Icon,
	useColorModeValue,
} from "@chakra-ui/react";

import Head from "next/head";
import Script from "next/script";

import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";

import Webcam from "react-webcam";

const Videocomponent2 = () => {
	useEffect(() => {}, []);

	return (
		<>
			<Head>
				<title>This page has a title 🤔</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Box></Box>
		</>
	);
};

export default Videocomponent;
