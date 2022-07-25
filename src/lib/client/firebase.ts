import {initializeApp, getApps, getApp} from 'firebase/app';
import {getAuth, onAuthStateChanged, createUserWithEmailAndPassword} from 'firebase/auth';
import { session } from '$app/stores';

import type {FirebaseApp} from 'firebase/app';
import type {User} from 'firebase/auth';

let app: FirebaseApp | null;
let unsubOnAuthStateChangeHandler: () => void;

export function initialFirebase() {
  if (!getApps().length) {
    const config = import.meta.env.VITE_FIREBASE_CONFIG;
    app = initializeApp(JSON.parse(config));
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
    const token = await user.getIdToken();

    session.update((oldSession: any) => {
      oldSession.user = {
        name: user.displayName,
        email: user.email,
        uid: user.uid
      }
      return oldSession;
    });
  } else {
    session.update((oldSession: any) => {
      oldSession.user = null;
      return oldSession;
    });
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