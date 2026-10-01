"use client";

import { getApps, getApp, initializeApp } from "firebase/app";
import { getAnalytics, isSupported, logEvent, type Analytics } from "firebase/analytics";

// Reuses the Firebase app instance firebase.js already initializes (apps are
// keyed by config, so this is a no-op once that module has loaded) rather
// than importing from firebase.js directly — that file also carries
// not-yet-pushed POS backend code that shouldn't ship just because analytics
// needs the app instance.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

let analyticsInstance: Analytics | null = null;
let initPromise: Promise<Analytics | null> | null = null;

// Analytics only works in a real browser (no SSR, and some browsers/privacy
// modes block it outright), so this is lazily initialized and safe to call
// from anywhere without crashing the server render.
function getAnalyticsInstance(): Promise<Analytics | null> {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (analyticsInstance) return Promise.resolve(analyticsInstance);

  if (!initPromise) {
    initPromise = isSupported().then((supported) => {
      if (!supported) return null;
      analyticsInstance = getAnalytics(app);
      return analyticsInstance;
    });
  }
  return initPromise;
}

export async function trackPageView(path: string) {
  const analytics = await getAnalyticsInstance();
  if (!analytics) return;
  logEvent(analytics, "page_view", { page_path: path });
}

export async function trackEvent(eventName: string, params?: Record<string, unknown>) {
  const analytics = await getAnalyticsInstance();
  if (!analytics) return;
  logEvent(analytics, eventName, params);
}
