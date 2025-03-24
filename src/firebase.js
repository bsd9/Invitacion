import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDhAPLWBr5v8z6dS7k2JR-Hv18qUG0vwA0",
  authDomain: "invitacion15-mfsz.firebaseapp.com",
  projectId: "invitacion15-mfsz",
  storageBucket: "invitacion15-mfsz.appspot.com",
  messagingSenderId: "1005096319983",
  appId: "1:1005096319983:web:32fafd022a7e858d2c141a",
  measurementId: "G-CP5Z4BVYQE"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };