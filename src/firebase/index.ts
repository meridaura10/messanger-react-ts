import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth'
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyDck_FAe_fCzOTupzVoiKO69h-xWJm974M",
  authDomain: "messenger-reactts.firebaseapp.com",
  databaseURL: "https://messenger-reactts-default-rtdb.firebaseio.com",
  projectId: "messenger-reactts",
  storageBucket: "messenger-reactts.appspot.com",
  messagingSenderId: "1090697829654",
  appId: "1:1090697829654:web:4040e5db8adf5e11bfc437"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore(app);