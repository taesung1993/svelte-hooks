import { getFirebaseAuth } from './firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const auth = getFirebaseAuth();

export async function loginWithGooglePopup() {
    try {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
    } catch (error) {
        console.log(error);
    }
}