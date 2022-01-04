import React from "react";

import {Flex, Box, useColorModeValue} from "@chakra-ui/react";
import {motion} from "framer-motion";

export const SectionStyled = ({children}) => {
	return (
		<Flex variant="section-item" direction={["column"]} alignItems="center" px="4rem" pt="2.2rem" pb="2.8rem" mb="2.8rem">
			{children}
		</Flex>
	);
};
