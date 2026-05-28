import { fireEvent, render, screen } from '@testing-library/react'
import { AuthProvider } from '../contexts/AuthProvider.tsx'
import AuthBar from './AuthBar.tsx'

const renderWithAuthProvider = () => {
    return render(
        <AuthProvider>
            <AuthBar />
        </AuthProvider>
    )
}

describe('AuthBar', () => {
    it('permet de se connecter via la modal', () => {
        renderWithAuthProvider()

        fireEvent.click(screen.getByRole('button', { name: 'Se connecter' }))
        fireEvent.change(screen.getByLabelText('Nom'), {
            target: { value: 'Alice' },
        })
        fireEvent.change(screen.getByLabelText('Email'), {
            target: { value: 'alice@example.com' },
        })
        fireEvent.click(
            screen.getByRole('button', { name: 'Valider la connexion' })
        )

        expect(screen.getByText('Alice')).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: 'Se déconnecter' })
        ).toBeInTheDocument()
    })
})
