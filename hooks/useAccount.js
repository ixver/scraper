import {useState, useEffect, useCallback} from "react";
import {firestoreDb as db} from "../models/firebase/config";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";

import {
	getFirestore,
	collection,
	getDoc,
	getDocs,
	setDoc,
	addDoc,
	updateDoc,
	deleteDoc,
	doc,
	increment,
	query,
	serverTimestamp,
	orderBy,
	limit,
	where,
	onSnapshot,
} from "firebase/firestore";

export const useAccountBase = () => {
	const auth = getAuth();
	const [user] = useAuthState(auth);

	return [auth, user];
};

export const useAccountGeneral = () => {
	const [auth, user] = useAccountBase();
	const [userStarttime, setUserStarttime] = useState();
	const [userStatus, setUserStatus] = useState();
	const [userCallstotal, setCallstotal] = useState(0);
	const loadUserData = (getDoc) => {
		user && console.log(user.uid);
		user &&
			getDoc(doc(db, "scrapeRequests", user.uid)).then((data) => {
				setCallstotal(data.data().callstotal);
				setUserStatus(data.data().status);
				setUserStarttime(data.data().accountCreatedAt.toDate().toDateString());
			});
	};
	useEffect(() => {
		if (user && user.uid) {
			loadUserData();
		} else {
			setUserStarttime();
			setUserStatus();
			setCallstotal(0);
		}
	}, [auth, user, userCallstotal]);
	const reloadUserData = useCallback(() => {
		loadUserData();
	}, []);

	return [auth, user, userStarttime, userStatus, userCallstotal, loadUserData];
};
