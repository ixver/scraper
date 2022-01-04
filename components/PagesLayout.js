import {useState, useContext} from "react";
import {useRouter} from "next/router";

import {background} from "@chakra-ui/styled-system";
import {Box, Flex, Image, Container, Text} from "@chakra-ui/react";

import Meta from "./Meta";
import Header from "./typicals/Header";
import Footer from "./Footer";
import PagesLayoutStyles from "../styles/PagesLayout.module.css";
import {AnimatePresence, motion} from "framer-motion";

const PagesLayout = ({children}) => {
	const router = useRouter();
	const [accounttogglestate, setaccounttogglestate] = useState(true);
	function handleaccounttoggle() {
		setaccounttogglestate((accounttogglestate) => !accounttogglestate);
	}
	const pageAnim = {
		hiding: {
			opacity: 0,
			y: -88,
		},
		showing: {
			opacity: 1,
			y: 0,
			transition: {
				type: "spring",
				damping: 8,
				duration: 0.17,
				// delay: 0.22,
				when: "beforeChildren",
			},
		},
		exiting: {
			opacity: 0,
			y: 280,
			transition: {
				ease: "easeOut",
				// duration: 0.22,
			},
		},
	};

	return (
		<Box position="relative">
			<Meta />
			<Header accounttogglestate={accounttogglestate} />
			<AnimatePresence exitBeforeEnter initial="true">
				<motion.div variants={pageAnim} key={router.route} initial="hiding" animate="showing" exit="exiting">
					{children}
				</motion.div>
			</AnimatePresence>
			<Footer />
		</Box>
	);
};

export default PagesLayout;
