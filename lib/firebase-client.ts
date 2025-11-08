import { initializeApp, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyDF2wmnHZWwLsJ3H20FMdnyNSVE7UNPGUE",
  authDomain: "srcsms-fbe25.firebaseapp.com",
  databaseURL: "https://srcsms-fbe25-default-rtdb.firebaseio.com",
  projectId: "srcsms-fbe25",
  storageBucket: "srcsms-fbe25.firebasestorage.app",
  messagingSenderId: "1085257788571",
  appId: "1:1085257788571:web:19f9d4f327868d1cdfaa3e",
  measurementId: "G-HJD1DPLCXR",
}

let app
try {
  app = getApp()
} catch {
  app = initializeApp(firebaseConfig)
}

export const auth = getAuth(app)
export const database = getDatabase(app)
