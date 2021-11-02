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

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FB_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FB_APIKEY,
  projectId: process.env.NEXT_PUBLIC_FB_APIKEY,
  storageBucket: process.env.NEXT_PUBLIC_FB_APIKEY,
  messagingSenderId: process.env.NEXT_PUBLIC_FB_APIKEY,
  appId: process.env.NEXT_PUBLIC_FB_APIKEY,
}

const app: FirebaseApp = initializeApp(firebaseConfig)
export default () => {
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
      } catch (error) {
        reject
      }
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
