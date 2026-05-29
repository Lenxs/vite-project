import { lazy, Suspense } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import PageLoader from '../components/PageLoader.tsx'
import PageTransition from '../components/PageTransition.tsx'
import ProtectedRoute from '../components/ProtectedRoute.tsx'

const DashboardPage = lazy(() => import('../pages/DashboardPage.tsx'))
const GuestPage = lazy(() => import('../pages/GuestPage.tsx'))

const AnimatedRoutes = () => {
    const location = useLocation()
    const transitionKey = `${location.pathname}-${location.key}`
    
    return (
        <PageTransition transitionKey={transitionKey}>
            <Suspense
                fallback={<PageLoader label="Chargement des routes..." />}
            >
                <Routes location={location}>
                    <Route path="/" element={<GuestPage />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <DashboardPage />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Suspense>
        </PageTransition>
    )
}

export default AnimatedRoutes
