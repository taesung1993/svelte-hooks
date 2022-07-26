import {initializeApp, getApps, getApp} from 'firebase/app';
import {getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import type {FirebaseApp} from 'firebase/app';
import type {User} from 'firebase/auth';
import {user as userStore} from '$lib/store/user';

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
    userStore.set(user);
  } else {
    await setToken('');
    userStore.set(null);
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

export async function signUpWithEmailAndPassword(body: {email: string; password: string}) {
  const auth = getAuth(app!);
  const {email, password} = body;
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function signInWithEmail(body: {email: string; password: string;}) {
  const auth = getAuth(app!);
  const {email, password} = body;
  return signInWithEmailAndPassword(auth, email, password);
}

export function handleFirebaseError(code: string) {
    switch(code) {
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        return '아이디 및 비밀번호를 제대로 입력해주세요.';
      case 'auth/email-already-in-use':
        return '이미 가입된 계정입니다.';
      default:
        return '알 수 없는 오류가 발생했습니다.';
    }
}