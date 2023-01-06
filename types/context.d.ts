import { Dispatch, SetStateAction } from "react"
import { User } from "./data"

export interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  error: string
  setUser: Dispatch<SetStateAction<User | null>>
  login: (user: User) => Promise<void>
  createUser: (user: User) => Promise<void>
  signOut: () => Promise<void>
}

export interface AuthProviderProps {
  api: {
    setUser: Dispatch<SetStateAction<User>>
    login: (user: User) => Promise<void>
    createUser: (user: User) => Promise<void>
    signOut: () => Promise<void>
  }
  children: React.ReactNode
}
