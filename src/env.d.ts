interface ImportMetaEnv {
  readonly VITE_FIREBASE_CONFIG: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}