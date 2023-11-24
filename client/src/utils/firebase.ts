import { initializeApp } from 'firebase/app'

const firebaseConfig = {
    apiKey: import.meta.env.TMU_PREP_AUTH_API_KEY,
    authDomain: import.meta.env.TMU_PREP_AUTH_DOMAIN,
    projectId: import.meta.env.TMU_PREP_AUTH_PROJECT_ID,
    storageBucket: import.meta.env.TMU_PREP_AUTH_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.TMU_PREP_AUTH_MSG_SENDER_ID,
    appId: import.meta.env.TMU_PREP_AUTH_APP_ID,
}

const app = initializeApp(firebaseConfig)

export default app
