import { initializeApp, FirebaseOptions, FirebaseApp } from 'firebase/app'
import {
    Auth,
    browserLocalPersistence,
    createUserWithEmailAndPassword,
    getAuth,
    setPersistence,
    signInWithEmailAndPassword,
    signOut,
    User,
} from 'firebase/auth'

declare global {
    interface Window {
        _env_: any;
    }
}
const firebaseConfig: FirebaseOptions = {
    apiKey: window._env_.apiKey,
    authDomain: window._env_.authDomain,
    projectId: window._env_.projectId,
    storageBucket: window._env_.storageBucket,
    messagingSenderId: window._env_.messagingSenderId,
    appId: window._env_.appId
};

const app: FirebaseApp = initializeApp(firebaseConfig)
const auth: Auth = getAuth()

setPersistence(auth, browserLocalPersistence)

const user: User | null = auth.currentUser

export default () => {

}