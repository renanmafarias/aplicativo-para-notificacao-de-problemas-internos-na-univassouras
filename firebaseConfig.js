import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyC0S3VwnTserd7nfBHXo88dl8TubbYp9Vo",
  authDomain: "my-project-27a68.firebaseapp.com",
  projectId: "my-project-27a68",
  storageBucket: "my-project-27a68.appspot.com",
  messagingSenderId: "270884004484",
  appId: "1:270884004484:web:53bab7949fb99fe1da58d1"
};

const app = initializeApp(firebaseConfig);
export const firebaseDB = getFirestore(app);
