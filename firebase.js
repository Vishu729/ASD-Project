import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-analytics.js";
import {getFirestore} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyAZncLkSj7vmT2gcvAFfLIb-ChTQNKhlzs",
    authDomain: "ahmazone-9f8cb.firebaseapp.com",
    databaseURL: "https://ahmazone-9f8cb-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ahmazone-9f8cb",
    storageBucket: "ahmazone-9f8cb.appspot.com",
    messagingSenderId: "39687918220",
    appId: "1:39687918220:web:a117c0d938f14b02d321a9",
    measurementId: "G-2HNND2SMT8"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  export const db = getFirestore(app);