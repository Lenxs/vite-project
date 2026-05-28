import { useState } from 'react'
import { useAuth } from '../hooks/useAuth.ts'
import Modal from './Modal.tsx'

const AuthBar = () => {
    const { user, isAuthenticated, login, logout } = useAuth()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const handleLogin = () => {
        login(name, email)
        setName('')
        setEmail('')
        setIsModalOpen(false)
    }

    if (isAuthenticated && user) {
        return (
            <section className="auth-bar" aria-label="Barre d'authentification">
                <p>
                    Connecté en tant que <strong>{user.name}</strong> (
                    {user.email})
                </p>
                <button type="button" onClick={logout}>
                    Se déconnecter
                </button>
            </section>
        )
    }

    const fillDemoCredentials = () => {
        setName('Alice Martin')
        setEmail('alice@example.com')
    }

    return (
        <section className="auth-bar" aria-label="Barre d'authentification">
            <p>Vous n&apos;êtes pas connecté.</p>
            <p className="auth-hint">
                Pas de mot de passe : saisissez un nom et un email, ou utilisez
                la connexion démo.
            </p>
            <button type="button" onClick={() => setIsModalOpen(true)}>
                Se connecter
            </button>

            <Modal
                isOpen={isModalOpen}
                title="Connexion"
                onClose={() => setIsModalOpen(false)}
            >
                <form
                    className="auth-form"
                    onSubmit={(event) => {
                        event.preventDefault()
                        handleLogin()
                    }}
                >
                    <p className="auth-hint">
                        Exemple : <strong>Alice Martin</strong> /{' '}
                        <strong>alice@example.com</strong>
                    </p>

                    <button
                        type="button"
                        className="auth-demo-button"
                        onClick={fillDemoCredentials}
                    >
                        Remplir la connexion démo
                    </button>

                    <label htmlFor="auth-name">Nom</label>
                    <input
                        id="auth-name"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Alice Martin"
                        required
                    />

                    <label htmlFor="auth-email">Email</label>
                    <input
                        id="auth-email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="alice@example.com"
                        required
                    />

                    <button type="submit">Valider la connexion</button>
                </form>
            </Modal>
        </section>
    )
}

export default AuthBar
