import {
    configureStore,
    createSlice,
    type PayloadAction,
    type Middleware,
} from '@reduxjs/toolkit'

import {
    useDispatch,
    useSelector,
    type TypedUseSelectorHook,
} from 'react-redux'

type ThemeState = {
    mode: 'light' | 'dark'
}

const initialState: ThemeState = {
    mode: 'light',
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light'
        },
        setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
            state.mode = action.payload
        },
    },
})

export const { toggleTheme, setTheme } = themeSlice.actions

const savedTheme =
    (localStorage.getItem('theme') as 'light' | 'dark') || 'light'

const persistThemeMiddleware: Middleware = (store) => (next) => (action) => {
    const result = next(action)
    const state = store.getState() as RootState

    localStorage.setItem('theme', state.theme.mode)

    return result
}

export const store = configureStore({
    reducer: {
        theme: themeSlice.reducer,
    },
    preloadedState: {
        theme: {
            mode: savedTheme,
        },
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(persistThemeMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
