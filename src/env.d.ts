interface ImportMetaEnv {
  readonly VITE_FIREBASE_CONFIG: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  }
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}