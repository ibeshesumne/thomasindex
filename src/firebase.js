import { initializeApp } from 'firebase/app';
import {
  getDatabase,
  ref,
  query,
  orderByKey,
  get,
  limitToFirst,
} from 'firebase/database'; // Import query functions
import { getAnalytics } from 'firebase/analytics'; // Optional, for analytics
import { getAuth } from 'firebase/auth'; // Optional, for authentication

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Realtime Database instance
export const db = getDatabase(app); // For Realtime Database

// Optional: Initialize Firebase Analytics
if (firebaseConfig.measurementId) {
  getAnalytics(app);
}

// Authentication instance (optional, if using Firebase Auth)
export const auth = getAuth(app);

// Fetch all letters data
export const fetchLettersData = async () => {
  try {
    const lettersRef = ref(db, 'letters');
    const snapshot = await get(lettersRef); // Fetch all data at the "letters" node
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.warn('No letters data found');
      return {};
    }
  } catch (error) {
    console.error('Error fetching letters data:', error);
    throw error;
  }
};

// Example: Fetch limited data
export const fetchLimitedData = async (path, limit = 10) => {
  try {
    const dataRef = ref(db, path);
    const limitedQuery = query(dataRef, orderByKey(), limitToFirst(limit));
    const snapshot = await get(limitedQuery);
    return snapshot.val() || {};
  } catch (error) {
    console.error('Error fetching limited data:', error);
    throw error;
  }
};

// Example: Fetch data by key
export const fetchDataByKey = async (path, key) => {
  try {
    const dataRef = ref(db, `${path}/${key}`);
    const snapshot = await get(dataRef);
    return snapshot.val() || null;
  } catch (error) {
    console.error('Error fetching data by key:', error);
    throw error;
  }
};
