import {initializeApp, getApps, getApp} from 'firebase/app';
import {getAuth, onAuthStateChanged, createUserWithEmailAndPassword} from 'firebase/auth';
import { session } from '$app/stores';

import type {FirebaseApp} from 'firebase/app';
import type {User} from 'firebase/auth';

let app: FirebaseApp | null;
let unsubOnAuthStateChangeHandler: () => void;

export function initialFirebase() {
  if (!getApps().length) {
    const config = {
      apiKey: "AIzaSyB65WkVXT2CPTMvYH6LLcQnc4yANLSbsqI",
      authDomain: "sveltekit-auth-68a48.firebaseapp.com",
      projectId: "sveltekit-auth-68a48",
      storageBucket: "sveltekit-auth-68a48.appspot.com",
      messagingSenderId: "454003295869",
      appId: "1:454003295869:web:c9e6a0bab5f18421d51314"
    };
    app = initializeApp(config);
  } else {
    app = getApp();
  }
  listenAuthStateChange();
}

function listenAuthStateChange() {
  const auth = getAuth(app!);
  onAuthStateChanged(auth, onAuthStateChangeHandler);
}

async function onAuthStateChangeHandler(user: User | null) {
  if (user) {
    const token = await user.getIdToken(true);
    await setToken(token);
  } else {
    await setToken('');
  }
}

async function setToken(token: string) {
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({token})
  };

  await fetch('/api/token', options);
}

export async function signUpWithEmailAndPassword(body: any) {
  const auth = getAuth(app!);
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, body.email, body.password).then((user) => {
      if(user) {
        resolve(user);
      }
    });
  });
}