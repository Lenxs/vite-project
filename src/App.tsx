import { lazy, Suspense } from 'react'
import './App.css'
import AuthBar from './components/AuthBar.tsx'
import Header from './components/Header.tsx'
import { useAuth } from './hooks/useAuth.ts'

const UsersPanel = lazy(() => import('./components/UsersPanel.tsx'))
const LocalUsersSection = lazy(() => import('./components/LocalUsersSection.tsx'))

const App = () => {
    const { isAuthenticated } = useAuth()

    return (
        <main className="app">
            <Header
                title="Mon application fil rouge"
                subtitle="Module 4 - Redux Form, Persist et Middleware"
            />
            <AuthBar />
            <Suspense fallback={<div>Chargement...</div>}>
                <UsersPanel />
            </Suspense>

            {isAuthenticated ? (
                <Suspense fallback={<div>Chargement...</div>}>
                    <LocalUsersSection />
                </Suspense>
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
