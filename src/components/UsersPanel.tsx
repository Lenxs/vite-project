import { useAuth } from '../hooks/useAuth.ts'
import { useFetch } from '../hooks/useFetch.ts'
import type { RemoteUser } from '../types/remoteUser.ts'
import RemoteUserListItem from './RemoteUserListItem.tsx'

const API_URL = 'https://jsonplaceholder.typicode.com/users'

const UsersPanel = () => {
    const { isAuthenticated } = useAuth()
    const fetchUrl = isAuthenticated ? API_URL : null
    const { data, loading, error } = useFetch<RemoteUser[]>(fetchUrl)

    if (!isAuthenticated) {
        return (
            <section className="users-panel" aria-label="Utilisateurs distants">
                <p>
                    Connectez-vous pour charger les utilisateurs via useFetch.
                </p>
            </section>
        )
    }

    if (loading) {
        return (
            <section className="users-panel" aria-label="Utilisateurs distants">
                <p>Chargement des utilisateurs...</p>
            </section>
        )
    }

    if (error) {
        return (
            <section className="users-panel" aria-label="Utilisateurs distants">
                <p role="alert">Erreur : {error}</p>
            </section>
        )
    }

    return (
        <section className="users-panel" aria-label="Utilisateurs distants">
            <h2>Utilisateurs API (useFetch)</h2>
            <ul>
                {data?.slice(0, 5).map((remoteUser) => (
                    <RemoteUserListItem
                        key={remoteUser.id}
                        id={remoteUser.id}
                        name={remoteUser.name}
                        email={remoteUser.email}
                    />
                ))}
            </ul>
        </section>
    )
}

export default UsersPanel
