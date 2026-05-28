import './App.css'
import AuthBar from './components/AuthBar.tsx'
import Header from './components/Header.tsx'
import LocalUsersSection from './components/LocalUsersSection.tsx'
import UsersPanel from './components/UsersPanel.tsx'
import { useAuth } from './hooks/useAuth.ts'

function App() {
    const { isAuthenticated } = useAuth()

    return (
        <main className="app">
            <Header
                title="Mon application fil rouge"
                subtitle="Module 4 - Redux Form, Persist et Middleware"
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
        </main>
    )
}

export default App
