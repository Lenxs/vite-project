import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AuthUser } from '../../types/auth.ts'

interface AuthState {
    user: AuthUser | null
}

const initialState: AuthState = {
    user: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (
            state,
            action: PayloadAction<{ name: string; email: string }>
        ) => {
            state.user = {
                id: Date.now(),
                name: action.payload.name,
                email: action.payload.email,
            }
        },
        logout: (state) => {
            state.user = null
        },
    },
})

export const { login, logout } = authSlice.actions
export const authReducer = authSlice.reducer

export const selectAuthUser = (state: { auth: AuthState }) => state.auth.user
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
    state.auth.user !== null