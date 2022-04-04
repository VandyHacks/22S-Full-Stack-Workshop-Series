import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATA_URL,
  projectId: process.env.PROJ_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_USER,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT,
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export default database;
