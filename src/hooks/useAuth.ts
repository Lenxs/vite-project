import { useAppDispatch, useAppSelector } from '../store/hooks.ts'
import {
    login,
    logout,
    selectAuthUser,
    selectIsAuthenticated,
} from '../store/slices/authSlice.ts'

export const useAuth = () => {
    const user = useAppSelector(selectAuthUser)
    const isAuthenticated = useAppSelector(selectIsAuthenticated)
    const dispatch = useAppDispatch()

    return {
        user,
        isAuthenticated,
        login: (name: string, email: string) => {
            dispatch(login({ name, email }))
        },
        logout: () => {
            dispatch(logout())
        },
    }
}
