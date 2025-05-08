"use client"

import { createContext, useState, useContext, type ReactNode } from "react"

// Define user type
interface User {
  id: number
  name: string
  email: string
  password: string
  phone: string
  devices?: number[]
}

// Define context type
interface UserContextType {
  currentUser: User | null
  setCurrentUser: (user: User | null) => void
  updateUser: (user: User) => void
  logout: () => void
}

// Create context with default values
const UserContext = createContext<UserContextType>({
  currentUser: null,
  setCurrentUser: () => {},
  updateUser: () => {},
  logout: () => {},
})

// Provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  // Update user information
  const updateUser = (user: User) => {
    setCurrentUser(user)
  }

  // Logout user
  const logout = () => {
    setCurrentUser(null)
  }

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, updateUser, logout }}>{children}</UserContext.Provider>
  )
}

// Custom hook to use the user context
export const useUser = () => useContext(UserContext)
