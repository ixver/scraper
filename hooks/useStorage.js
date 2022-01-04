import { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL  } from 'firebase/storage';
import { getFirestore, serverTimestamp as timestamp, collection, addDoc } from 'firebase/firestore';

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // references
    const firestore = getFirestore();
    const storage = getStorage();
    const storageRef = ref(storage, file.name);

    const collectionRef = collection(firestore, 'images');

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      }, 
      (error) => {
        setError(err);
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const createdAt = timestamp();
          addDoc(collectionRef, { downloadURL, createdAt });
          setUrl(downloadURL);
        });
      }
    );
  }, [file]);


  return { progress, url, error };
}

export default useStorage;