import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { FIREBASE_CONFIG } from "../env"

export const isFirebaseConfigured = !!FIREBASE_CONFIG.apiKey

const app = isFirebaseConfigured
  ? getApps().length
    ? getApp()
    : initializeApp(FIREBASE_CONFIG as Required<typeof FIREBASE_CONFIG>)
  : null

export const firebaseAuth = app ? getAuth(app) : null
export const firebaseDb = app ? getFirestore(app) : null
