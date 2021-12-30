import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const fire = firebase.initializeApp({
  apiKey: "AIzaSyCxxFf5OQaue5OybeciOpCURLgdIsaXC_o",
  authDomain: "lolipopz-423fd.firebaseapp.com",
  projectId: "lolipopz-423fd",
  storageBucket: "lolipopz-423fd.appspot.com",
  messagingSenderId: "662177865202",
  appId: "1:662177865202:web:fbb5729fd2ed016e0e1f6b",
  measurementId: "G-3BF16T796K"
});

// Initialize Firebase
export const auth = fire.auth();
export const db = fire.firestore();

export default {
 fire,
};