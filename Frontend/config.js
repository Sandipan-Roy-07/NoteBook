import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDhqxO0-PahE88A9e_eAJPDG3GUibJUv78",
  authDomain: "notes-45ef6.firebaseapp.com",
  projectId: "notes-45ef6",
  storageBucket: "notes-45ef6.appspot.com",
  messagingSenderId: "512608843323",
  appId: "1:512608843323:web:e661b556c987594c278e1e",
  measurementId: "G-YDJ2WF8EXV"
};

const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);