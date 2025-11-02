// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDvwdSkUyj4OO-pcHejMfqcetjZaiSE418",
  authDomain: "restaurant-reviews-85a87.firebaseapp.com",
  projectId: "restaurant-reviews-85a87",
  storageBucket: "restaurant-reviews-85a87.firebasestorage.app",
  messagingSenderId: "359275424309",
  appId: "1:359275424309:web:99be42d0f9711c9c899f7c",
  measurementId: "G-BSFG5BTELZ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };