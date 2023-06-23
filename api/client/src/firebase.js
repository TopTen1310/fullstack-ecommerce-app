// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBvOZr09RqkBHgMLi4Tx_v81VpD8gQ498w",
    authDomain: "fullstack-ecommerce-f3adb.firebaseapp.com",
    projectId: "fullstack-ecommerce-f3adb",
    storageBucket: "fullstack-ecommerce-f3adb.appspot.com",
    messagingSenderId: "56575059230",
    appId: "1:56575059230:web:2e1d065325bb190390150f",
    measurementId: "G-4EKSQFG2DZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, ref, uploadBytesResumable, getDownloadURL }