import { lazy, Suspense } from 'react'
import PageLoader from '../components/PageLoader.tsx'

const UsersPanel = lazy(() => import('../components/UsersPanel.tsx'))
const LocalUsersSection = lazy(
    () => import('../components/LocalUsersSection.tsx')
)

const DashboardPage = () => {
    return (
        <div className="dashboard-page">
            <Suspense
                fallback={
                    <PageLoader label="Chargement des utilisateurs API..." />
                }
            >
                <UsersPanel />
            </Suspense>

            <Suspense
                fallback={
                    <PageLoader label="Chargement des utilisateurs locaux..." />
                }
            >
                <LocalUsersSection />
            </Suspense>
        </div>
    )
}

export default DashboardPage
