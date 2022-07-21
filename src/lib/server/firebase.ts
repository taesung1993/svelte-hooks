import admin from 'firebase-admin';
import type {DecodedIdToken} from 'firebase-admin/lib/auth/token-verifier';

async function initializeFirebaseAdmin() { 
  if (!admin.apps.length) {
    const serviceAccount: any =  await import('firebase_service_account.json');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }
}

export async function decodeToken(token: string): Promise<DecodedIdToken | null> {
  console.log(token);
  if(!token || token === 'null' || token === undefined) {
    return null;
  }
  try {
    initializeFirebaseAdmin();
    return await admin.auth().verifyIdToken(token);
  } catch (error) {
    console.log(error);
    return null;
  }
} 