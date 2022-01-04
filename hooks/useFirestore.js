import {useState, useEffect} from "react";
import {firestoreDb as db} from "../models/firebase/config";
// import { getFirestore, collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import {collection, query, orderBy, onSnapshot} from "firebase/firestore";

const useFirestore = (collectionInput) => {
	const [docs, setDocs] = useState([]);

	useEffect(() => {
		// const db = getFirestore();
		const collectionRef = collection(db, collectionInput);
		const q = query(collectionRef, orderBy("createdAt", "desc"));
		const unsub = onSnapshot(q, (snap) => {
			let documents = [];
			snap.forEach((doc) => {
				documents.push({...doc.data(), id: doc.id});
			});
			setDocs(documents);
		});

		return () => unsub();
		// this is a cleanup function that react will run when
		// a component using the hook unmounts
	}, [collectionInput]);

	return {docs};
};

export default useFirestore;
