import { NavLink } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const AppNav = () => {
    const { isAuthenticated } = useAuth()

    return (
        <nav className="app-nav" aria-label="Menu principal">
            <NavLink
                to="/"
                end
                className={({ isActive }) => (isActive ? 'active' : '')}
            >
                Accueil
            </NavLink>
            {isAuthenticated ? (
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) => (isActive ? 'active' : '')}
                >
                    Tableau de bord
                </NavLink>
            ) : (
                <span
                    className="app-nav-disabled"
                    title="Connectez-vous d'abord"
                >
                    Tableau de bord
                </span>
            )}
        </nav>
    )
}

export default AppNav
