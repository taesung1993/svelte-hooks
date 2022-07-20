import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyB65WkVXT2CPTMvYH6LLcQnc4yANLSbsqI",
    authDomain: "sveltekit-auth-68a48.firebaseapp.com",
    projectId: "sveltekit-auth-68a48",
    storageBucket: "sveltekit-auth-68a48.appspot.com",
    messagingSenderId: "454003295869",
    appId: "1:454003295869:web:c9e6a0bab5f18421d51314"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);