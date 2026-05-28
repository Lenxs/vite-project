import { Suspense } from 'react'
import './App.css'
import AuthBar from './components/AuthBar.tsx'
import Header from './components/Header.tsx'
import LocalUsersSection from './components/LocalUsersSection.tsx'
import UsersPanel from './components/UsersPanel.tsx'
import { useAuth } from './hooks/useAuth.ts'

// const DashboardPage = lazy(() => import('./pages/DashboardPage.tsx'))

function App() {
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
