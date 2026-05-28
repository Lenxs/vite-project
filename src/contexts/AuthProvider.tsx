import { useMemo, useState, type ReactNode } from 'react'
import type { AuthUser } from '../types/auth.ts'
import { AuthContext, type AuthContextValue } from './authContext.ts'

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<AuthUser | null>(null)

    const value = useMemo<AuthContextValue>(
        () => ({
            user,
            isAuthenticated: user !== null,
            login: (name, email) => {
                setUser({
                    id: Date.now(),
                    name,
                    email,
                })
            },
            logout: () => {
                setUser(null)
            },
        }),
        [user]
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}