import {useState} from "react";
import "../styles/globals.css";
// import "@fontsource/libre-franklin/800.css";
// import "@fontsource/sarala/400.css";
// import "@fontsource/overpass/400.css";
import "@fontsource/poppins";
import "@fontsource/roboto";
import "@fontsource/montserrat";

import {ChakraProvider, CSSReset} from "@chakra-ui/react";
// import { theme } from '@chakra-ui/react'
import theme from "../styles/ChakraTheme";

import PagesLayout from "../components/PagesLayout";

import {AnimatePresence, motion} from "framer-motion";

import {AccountProvider} from "../components/Contexts";

function Website({Component, pageProps, router}) {
	return (
		<AccountProvider>
			<ChakraProvider theme={theme}>
				{/* <CSSReset />  */}
				{/* <AnimatePresence exitBeforeEnter initial={true}> */}

				<PagesLayout router={router}>
					<Component {...pageProps} />
				</PagesLayout>
				{/* </AnimatePresence> */}
			</ChakraProvider>
		</AccountProvider>
	);
}

export default Website;
