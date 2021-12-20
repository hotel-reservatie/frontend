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
import { createLogicalWrapper } from 'src/utils/logicalWrapper'

interface IAuthContext {
  user: User | null
  restoreAuth: () => Promise<{ state: User; token: string }>
  createUser: (
    email: string,
    password: string,
    username: string,
  ) => Promise<Boolean>
  login: (email: string, password: string) => Promise<LoginResponse>
  logout: () => Promise<Boolean>
  signedIn: boolean
}

export interface LoginResponse {
  success: boolean
  errCode?: string
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

export const Authenticated = createLogicalWrapper(
  AuthContext,
  (ctx: any) => ctx.signedIn,
)

export const NotAuthenticated = createLogicalWrapper(
  AuthContext,
  (ctx: any) => !ctx.signedIn,
)

export const AuthProvider: FunctionComponent = ({ children }) => {
  const [graphqlClient, SetgraphqlClient] = useState<ApolloClient<any>>(client)
  const [user, setUser] = useState<User | null>(null)
  const [signedIn, setSignedIn] = useState(false)
  const app: FirebaseApp = initializeApp(firebaseConfig)
  const auth: Auth = getAuth()
  setPersistence(auth, browserLocalPersistence)

  useEffect(() => {
    let mounted = true
    restoreAuth().then(data => {
      if (mounted) {
        SetgraphqlClient(createGraphqlClient(data.token))
        setUser(data.state)
        setSignedIn(true)
      }
    })
    return () => {
      mounted = false
    }
  }, [])

  const restoreAuth = (): Promise<{ state: User; token: string }> => {
    return new Promise((resolve, reject) => {
      try {
        auth.onAuthStateChanged(async state => {
          // console.log(state)
          if (state) {
            const token = await state.getIdToken()
            resolve({ state, token })
          } else {
            reject
          }
        })
      } catch (error) {
        reject
      }
    })
  }

  const createUser = async (
    email: string,
    password: string,
    username: string,
  ): Promise<Boolean> => {
    return new Promise((resolve, reject) => {
      try {
        const url: string = process.env.NEXT_PUBLIC_BACKEND as string
        fetch(`http://${url.split('/')[2]}/auth/signup`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            email: email,
            password: password,
            name: username,
          }),
        })
          .then(async response => {
            await login(email, password)
              .then(res => {
                resolve(true)
              })
              .catch(e => {
                reject
              })
          })
          .catch(e => {
            reject
          })
      } catch (e) {
        reject
      }
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

  const login = (email: string, password: string): Promise<LoginResponse> => {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
        .then(async userCredential => {
          SetgraphqlClient(
            createGraphqlClient(await userCredential.user.getIdToken()),
          )
          setUser(userCredential.user)
          setSignedIn(true)
          resolve({ success: true })
        })
        .catch(error => {
          const errorCode = error.code
          const errorMessage = error.message
          console.log(error)

          resolve({ success: false, errCode: errorCode })
        })
    })
  }

  const logout = (): Promise<Boolean> => {
    return new Promise((resolve, reject) => {
      signOut(auth)
        .then(() => {
          setUser(null)
          setSignedIn(false)
          resolve(true)
        })
        .catch(e => {
          reject(false)
        })
    })
  }

  const value = {
    user,
    restoreAuth,
    createUser,
    login,
    logout,
    signedIn,
  }

  return (
    <AuthContext.Provider value={value}>
      <ApolloProvider client={graphqlClient}>{children}</ApolloProvider>
    </AuthContext.Provider>
  )
}
