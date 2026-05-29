import { lazy, Suspense, useState } from 'react'
import { useAuth } from '../hooks/useAuth.ts'
import { useAppDispatch, useAppSelector } from '../store/hooks.ts'
import {
    resetLoginForm,
    selectLoginForm,
    setLoginForm,
    updateLoginField,
} from '../store/slices/loginFormSlice.ts'
import PageLoader from './PageLoader.tsx'

const Modal = lazy(() => import('./Modal.tsx'))

const AuthBar = () => {
    const { user, isAuthenticated, login, logout } = useAuth()
    const dispatch = useAppDispatch()
    const { name, email } = useAppSelector(selectLoginForm)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleLogin = () => {
        login(name, email)
        dispatch(resetLoginForm())
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
        dispatch(
            setLoginForm({
                name: 'Alice Martin',
                email: 'alice@example.com',
            })
        )
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
            <Suspense
                fallback={<PageLoader label="Chargement de la modal..." />}
            >
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
                            onChange={(event) =>
                                dispatch(
                                    updateLoginField({
                                        field: 'name',
                                        value: event.target.value,
                                    })
                                )
                            }
                            placeholder="Alice Martin"
                            required
                        />

                        <label htmlFor="auth-email">Email</label>
                        <input
                            id="auth-email"
                            type="email"
                            value={email}
                            onChange={(event) =>
                                dispatch(
                                    updateLoginField({
                                        field: 'email',
                                        value: event.target.value,
                                    })
                                )
                            }
                            placeholder="alice@example.com"
                            required
                        />

                        <button type="submit">Valider la connexion</button>
                    </form>
                </Modal>
            </Suspense>
        </section>
    )
}

export default AuthBar
