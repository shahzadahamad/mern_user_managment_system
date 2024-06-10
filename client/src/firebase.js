import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-24f32.firebaseapp.com",
  projectId: "mern-auth-24f32",
  storageBucket: "mern-auth-24f32.appspot.com",
  messagingSenderId: "458873638724",
  appId: "1:458873638724:web:1d16efc88b7738a60a5111"
};

export const app = initializeApp(firebaseConfig);