import { lazy, Suspense } from 'react'
import { TransitionGroup } from 'react-transition-group'
import './App.css'
import AuthBar from './components/AuthBar.tsx'
import Header from './components/Header.tsx'
import { useAuth } from './hooks/useAuth.ts'
import PageLoader from './components/PageLoader.tsx'
import PageTransition from './components/PageTransition.tsx'

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
            <TransitionGroup>
                <PageTransition location={isAuthenticated ? 'dashboard' : 'guest'}>
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
                </PageTransition>
            </TransitionGroup>
        </main>
    )
}

export default App
