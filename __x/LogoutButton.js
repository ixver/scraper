import React, { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { LinkOverlay, Button, IconButton, Tooltip, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import { MdTransitEnterexit } from "react-icons/md";
const LogoutButton = () => {

  const auth = getAuth();
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     // const uid = user.uid;
  //   } 
  //   else {
  //     auth = null;
  //   }
  // })

  return auth.currentUser && (
    <Tooltip label='logout' placement='top' hasArrow>
    <IconButton
      aria-label="logout"
      icon={<MdTransitEnterexit fontSize='2.8rem' />}
      onClick={() => auth.signOut()}
      colorScheme={useColorModeValue('bodyDark', 'bodyLight')}
    />
    </Tooltip>
  )
}

export default LogoutButton;