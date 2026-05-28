import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { render, type RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import type { ReactElement, ReactNode } from 'react'
import { authReducer } from '../store/slices/authSlice.ts'
import { loginFormReducer } from '../store/slices/loginFormSlice.ts'

const testReducer = combineReducers({
  auth: authReducer,
  loginForm: loginFormReducer,
})

interface TestState {
  auth: { user: null }
  loginForm: { name: string; email: string }
}

interface ExtendedRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: Partial<TestState>
}

export function renderWithProviders(
  ui: ReactElement,
  { preloadedState, ...renderOptions }: ExtendedRenderOptions = {},
) {
  const store = configureStore({
    reducer: testReducer,
    preloadedState,
  })

  function Wrapper({ children }: { children: ReactNode }) {
    return <Provider store={store}>{children}</Provider>
  }

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  }
}
