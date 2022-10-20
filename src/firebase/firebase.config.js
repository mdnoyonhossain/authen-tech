
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC-VurMv_H7EW8bBi6vmc7qzqi9ng9z7OI",
  authDomain: "authentech-ba46d.firebaseapp.com",
  projectId: "authentech-ba46d",
  storageBucket: "authentech-ba46d.appspot.com",
  messagingSenderId: "866371102524",
  appId: "1:866371102524:web:e43b236805ae275792e039"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;