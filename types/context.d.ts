import { User } from "./data"

export interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  error: string
  login: (user: User) => Promise<void>
  createUser: (user: User) => Promise<void>
  signOut: () => Promise<void>
}

export interface AuthProviderProps {
  api: {
    login: (user: User) => Promise<void>
    createUser: (user: User) => Promise<void>
    signOut: () => Promise<void>
  }
  children: React.ReactNode
}
