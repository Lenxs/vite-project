import { isAction, type Middleware } from '@reduxjs/toolkit'
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
} from 'redux-persist'

const ignoredActions = new Set<string>([
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
])

export const loggerMiddleware: Middleware = (store) => (next) => (action) => {
    if (isAction(action) && ignoredActions.has(action.type)) {
        return next(action)
    }

    const previousState = store.getState()
    const result = next(action)
    const nextState = store.getState()

    console.group(
        `[Redux Logger] ${isAction(action) ? action.type : 'unknown'}`
    )
    console.log('Action:', action)
    console.log('Previous state:', previousState)
    console.log('Next state:', nextState)
    console.groupEnd()

    return result
}
