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
import {FaceMesh} from "@mediapipe/face_mesh";
import * as Facemesh from "@mediapipe/face_mesh";
import * as cam from "@mediapipe/camera_utils";
import Webcam from "react-webcam";

const Videocomponent = () => {
	// ######## 2 ########
	const webcamRef = useRef(null);
	const canvasRef = useRef(null);
	var camera = null;
	// ######## 6 ########
	function onResults(results) {
		console.log("running");
		console.log(results);
		// // const video = webcamRef.current.video;
		// const videoWidth = webcamRef.current.video.videoWidth;
		// const videoHeight = webcamRef.current.video.videoHeight;

		// // Set canvas width
		// canvasRef.current.width = videoWidth;
		// canvasRef.current.height = videoHeight;

		// const canvasElement = canvasRef.current;
		// const canvasCtx = canvasElement.getContext("2d");
		// canvasCtx.save();
		// canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
		// canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
		// if (results.multiFaceLandmarks) {
		// 	for (const landmarks of results.multiFaceLandmarks) {
		// 		connect(canvasCtx, landmarks, Facemesh.FACEMESH_TESSELATION, {
		// 			color: "#C0C0C070",
		// 			lineWidth: 1,
		// 		});
		// 		connect(canvasCtx, landmarks, Facemesh.FACEMESH_RIGHT_EYE, {
		// 			color: "#FF3030",
		// 		});
		// 		connect(canvasCtx, landmarks, Facemesh.FACEMESH_RIGHT_EYEBROW, {
		// 			color: "#FF3030",
		// 		});
		// 		connect(canvasCtx, landmarks, Facemesh.FACEMESH_LEFT_EYE, {
		// 			color: "#30FF30",
		// 		});
		// 		connect(canvasCtx, landmarks, Facemesh.FACEMESH_LEFT_EYEBROW, {
		// 			color: "#30FF30",
		// 		});
		// 		connect(canvasCtx, landmarks, Facemesh.FACEMESH_FACE_OVAL, {
		// 			color: "#E0E0E0",
		// 		});
		// 		connect(canvasCtx, landmarks, Facemesh.FACEMESH_LIPS, {
		// 			color: "#E0E0E0",
		// 		});
		// 	}
		// }
		// canvasCtx.restore();
	}
	// ###################

	// ###################
	// ######## 3 ########
	// SET FACEMESH MODEL OBJECT (BASED ON DOC)
	// ###################
	// setInterval(())
	console.log("webcameref working", webcamRef);
	console.log("canvasRef working", canvasRef);
	useEffect(() => {
		const faceMesh = new FaceMesh({
			locateFile: (file) => {
				return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
			},
		});
		console.log("faceMesh working", faceMesh);

		// ###################
		// ######## 4 ########
		// SET BUILT-IN FACEMESH OPTIONS
		faceMesh.setOptions({
			maxNumFaces: 1,
			refineLandmarks: true,
			minDetectionConfidence: 0.5,
			minTrackingConfidence: 0.5,
		});
		// ###################
		// ###################

		// ######## 6 ########
		// SET RESULTS (BASED ON DOCS) - ALSO MORE ABOVE
		faceMesh.onResults(onResults);
		// ###################

		// ###################
		// ######## 5 ########
		// START CAMERA INTO WEBCAM UTILS AS SIZE WITH ACTUAL CAMERA IN WEBCAMREF, GET DATA FROM FACEMESH PER FRAME WITH INPUTTED VIDEO
		if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null) {
			console.log("cam running");
			camera = new cam.Camera(webcamRef.current.video, {
				onFrame: async () => {
					await faceMesh.send({image: webcamRef.current.video});
				},
				width: 640,
				height: 480,
			});
			console.log("camera", camera);
			camera.start();
		}
		// ###################
		// ###################
		// ###################
		// ###################
	}, []);

	return (
		<>
			<Head>
				<title>This page has a title 🤔</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<script src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js" crossorigin="anonymous"></script>
				<script src="https://cdn.jsdelivr.net/npm/@mediapipe/control_utils/control_utils.js" crossorigin="anonymous"></script>
				<script src="https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js" crossorigin="anonymous"></script>
				{/* <script src="https://cdn.jsdelivr.net/npm/@mediapipe/holistic/holistic.js" crossorigin="anonymous"></script> */}
				<script src="https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js" crossorigin="anonymous"></script>
			</Head>
			<Box>
				<Heading>Video Face Landmark Detection</Heading>
				<Box>
					<Webcam
						ref={webcamRef}
						style={{
							position: "relative",
							marginLeft: "auto",
							marginRight: "auto",
							left: 0,
							right: 0,
							textAlign: "center",
							zindex: 100,
							width: 640,
							height: 480,
						}}
					/>{" "}
					<canvas
						ref={canvasRef}
						className="output_canvas"
						style={{
							position: "absolute",
							marginLeft: "auto",
							marginRight: "auto",
							left: 0,
							right: 0,
							textAlign: "center",
							zindex: 9,
							width: 640,
							height: 480,
						}}
					></canvas>
				</Box>
			</Box>
		</>
	);
};

export default Videocomponent;
