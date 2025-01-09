import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA2NFdgVFExDIEOs8HmaFMjErXuNaYlpT8",
  authDomain: "camel-12a6f.firebaseapp.com",
  projectId: "camel-12a6f_ID",
  storageBucket: "camel-12a6f_ID.appspot.com",
  messagingSenderId: "401875315198",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
