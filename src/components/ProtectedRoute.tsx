import { Navigate, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useAuth } from '../hooks/useAuth.ts'

interface ProtectedRouteProps {
    children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isAuthenticated } = useAuth()
    const location = useLocation()

    if (!isAuthenticated) {
        return <Navigate to="/" replace={false} state={{ from: location }} />
    }

    return children
}

export default ProtectedRoute
