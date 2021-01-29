// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3d8Ukihd_JbVToPqkz7dqem-Nb26sVBU",
  authDomain: "nescii-1o1.firebaseapp.com",
  projectId: "nescii-1o1",
  storageBucket: "nescii-1o1.appspot.com",
  messagingSenderId: "4694794732",
  appId: "1:4694794732:web:71dde450292957bec820c9",
  measurementId: "G-NBKEGKSYR9"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth,provider,db, storage};
export default db;
