import { lazy, Suspense } from 'react'
import './App.css'
import AuthBar from './components/AuthBar.tsx'
import Header from './components/Header.tsx'
import { useAuth } from './hooks/useAuth.ts'
import PageLoader from './components/PageLoader.tsx'

const DashboardPage = lazy(() => import('./pages/DashboardPage.tsx'))
const GuestPage = lazy(() => import('./pages/GuestPage.tsx'))

const App = () => {
    const { isAuthenticated } = useAuth()

    return (
        <main className="app">
            <Header
                title="Mon application fil rouge"
                subtitle="Module 4 - Redux Form, Persist et Middleware"
            />
            <AuthBar />
            <Suspense
                fallback={
                    <PageLoader
                        label={
                            isAuthenticated
                                ? 'Chargement du tableau de bord...'
                                : 'Chargement de la page invité...'
                        }
                    />
                }
            >
                {isAuthenticated ? <DashboardPage /> : <GuestPage />}
            </Suspense>
        </main>
    )
}

export default App
