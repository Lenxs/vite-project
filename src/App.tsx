import './App.css'
import AuthBar from './components/AuthBar.tsx'
import Header from './components/Header.tsx'
import LocalUsersSection from './components/LocalUsersSection.tsx'
import UsersPanel from './components/UsersPanel.tsx'
import { useAuth } from './hooks/useAuth.ts'

import { useAppDispatch, useAppSelector, toggleTheme } from './store/store.ts'

function App() {
    const { isAuthenticated } = useAuth()
    const dispatch = useAppDispatch()

    const theme = useAppSelector((state) => state.theme.mode)

    return (
        <main className="app">
            <Header
                title="Mon application fil rouge"
                subtitle="Module 3 - Contexts, Portals et Custom Hooks"
            />
            <AuthBar />
            <UsersPanel />

            {isAuthenticated ? (
                <LocalUsersSection />
            ) : (
                <p className="app-hint">
                    Connectez-vous pour ajouter des utilisateurs locaux et
                    accéder au formulaire principal.
                </p>
            )}

            {/*  */}
            <div
                style={{
                    height: '100vh',
                    background: theme === 'dark' ? '#111' : '#fff',
                    color: theme === 'dark' ? '#fff' : '#111',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <h1>Theme: {theme}</h1>

                <button onClick={() => dispatch(toggleTheme())}>
                    Toggle Theme
                </button>
            </div>
        </main>
    )
}

export default App
