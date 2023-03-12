// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvGt-vgV52I1oLZzzfNED-1af2l2YBjsY",
  authDomain: "socialpha-d2ce1.firebaseapp.com",
  projectId: "socialpha-d2ce1",
  storageBucket: "socialpha-d2ce1.appspot.com",
  messagingSenderId: "9009036047",
  appId: "1:9009036047:web:eec275ebc8bba786c69c7a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const storage=getStorage(app);