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
import { useState } from 'react'
import graphQL from './useGraphQL'

declare global {
  interface Window {
    _env_: any
  }
}
const firebaseConfig: FirebaseOptions = {
  apiKey: window._env_.apiKey,
  authDomain: window._env_.authDomain,
  projectId: window._env_.projectId,
  storageBucket: window._env_.storageBucket,
  messagingSenderId: window._env_.messagingSenderId,
  appId: window._env_.appId,
}

export default () => {
  const app: FirebaseApp = initializeApp(firebaseConfig)
  const auth: Auth = getAuth()

  setPersistence(auth, browserLocalPersistence)
  const [user, setUser] = useState<User | null>(null)
  const { query } = graphQL()

  const restoreAuth = (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      try {
        auth.onAuthStateChanged(async state => {
          console.log(state)
          if (state) {
            setUser(state)
            resolve(true)
          } else {
            resolve(false)
          }
        })
      } catch (error) {}
    })
  }

  const createUser = (name: string, email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async userCredential => {
        setUser(userCredential.user)
        const response = await query(
          `createUser`,
          `mutation createUser($data: UserInput = {uuid: "", name: ""}) {
                    createUser(data: $data){
                        id
                        name
                        uuid
                    }
                }`,
          {
            data: {
              uuid: user?.uid,
              name: name,
            },
          },
        )
      })
      .catch(error => {
        console.log({ error })
      })
  }

  const login = (email: string, password: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
        .then(async userCredential => {
          setUser(userCredential.user)
          resolve(true)
        })
        .catch(error => {
          const errorCode = error.code
          const errorMessage = error.message
          reject(false)
        })
    })
  }

  const logout = () => {
    return signOut(auth)
  }

  return {
    user,
    restoreAuth,
    createUser,
    login,
    logout,
  }
}
