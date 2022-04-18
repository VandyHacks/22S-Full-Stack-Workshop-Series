import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDXdkHMw8w3BqKmoAn94Kf93YtDT3Y09v8",
  authDomain: "todo-list-dd643.firebaseapp.com",
  projectId: "todo-list-dd643",
  storageBucket: "todo-list-dd643.appspot.com",
  messagingSenderId: "1037412888449",
  appId: "1:1037412888449:web:f661b0000de21f53284280",
  measurementId: "G-KDWL7WV84D",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);
