import { initializeApp } from "firebase/app";
import firebaseConfig from "@/configs/firebase-auth";

const firebaseAppInit = initializeApp(firebaseConfig);
export default firebaseAppInit;
