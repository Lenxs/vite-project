import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface LoginFormState {
    name: string
    email: string
}

const initialState: LoginFormState = {
    name: '',
    email: '',
}

const loginFormSlice = createSlice({
    name: 'loginForm',
    initialState,
    reducers: {
        updateLoginField: (
            state,
            action: PayloadAction<{
                field: keyof LoginFormState
                value: string
            }>
        ) => {
            state[action.payload.field] = action.payload.value
        },
        setLoginForm: (state, action: PayloadAction<LoginFormState>) => {
            state.name = action.payload.name
            state.email = action.payload.email
        },
        resetLoginForm: (state) => {
            state.name = ''
            state.email = ''
        },
    },
})

export const { updateLoginField, setLoginForm, resetLoginForm } =
    loginFormSlice.actions
    
export const loginFormReducer = loginFormSlice.reducer

export const selectLoginForm = (state: { loginForm: LoginFormState }) =>
    state.loginForm
