import {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from 'react'
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
  updateProfile,
} from 'firebase/auth'
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import client from 'src/utils/apollo'

interface IAuthContext {
  user: User | null
  restoreAuth: () => Promise<boolean>
  createUser: (email: string, password: string, username: string) => void
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

const createGraphqlClient = (token: string): ApolloClient<any> => {
  const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_BACKEND,
  })

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  })

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })

  return client
}

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FB_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FB_APIKEY,
  projectId: process.env.NEXT_PUBLIC_FB_APIKEY,
  storageBucket: process.env.NEXT_PUBLIC_FB_APIKEY,
  messagingSenderId: process.env.NEXT_PUBLIC_FB_APIKEY,
  appId: process.env.NEXT_PUBLIC_FB_APIKEY,
}

export function useAuth() {
  return useContext(AuthContext)
}

export const AuthProvider: FunctionComponent = ({ children }) => {
  const [graphqlClient, SetgraphqlClient] = useState<ApolloClient<any>>(client)
  const [user, setUser] = useState<User | null>(null)
  const app: FirebaseApp = initializeApp(firebaseConfig)
  const auth: Auth = getAuth()
  setPersistence(auth, browserLocalPersistence)

  useEffect(() => {
    restoreAuth()
  }, [])

  const restoreAuth = (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      try {
        auth.onAuthStateChanged(async state => {
          // console.log(state)
          if (state) {
            SetgraphqlClient(createGraphqlClient(await state.getIdToken()))
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

  const createUser = (email: string, password: string, username: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async userCredential => {
        setUser(userCredential.user)
        changeUserDisplayName(username, userCredential.user)
      })
      .catch(error => {
        console.log({ error })
      })
  }

  const changeUserDisplayName = (
    username: string,
    user: User,
  ): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      updateProfile(user, {
        displayName: username,
      })
        .then(value => {
          console.log(value)

          resolve(true)
        })
        .catch(e => {
          console.log('Unable to update username: ', e)
          reject(false)
        })
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
          console.log(error)

          reject(false)
        })
    })
  }

  const logout = () => {
    return signOut(auth)
  }

  const value = {
    user,
    restoreAuth,
    createUser,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      <ApolloProvider client={graphqlClient}>{children}</ApolloProvider>
    </AuthContext.Provider>
  )
}
