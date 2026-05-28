import { combineReducers, configureStore } from '@reduxjs/toolkit'

import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
    persistStore,
} from 'redux-persist'
import { loggerMiddleware } from './middleware/loggerMiddleware.ts'
import storage from './storage.ts'
import { authReducer } from './slices/authSlice.ts'
import { loginFormReducer } from './slices/loginFormSlice.ts'

const authPersistConfig = {
    key: 'auth',
    storage,
}

const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
    loginForm: loginFormReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }).concat(loggerMiddleware),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
