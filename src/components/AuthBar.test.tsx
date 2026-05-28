import { fireEvent, screen, waitFor } from '@testing-library/react'
import AuthBar from './AuthBar.tsx'
import { renderWithProviders } from '../test/test-utils.tsx'

describe('AuthBar', () => {
    it('permet de se connecter via la modal', async () => {
        renderWithProviders(<AuthBar />)

        fireEvent.click(screen.getByRole('button', { name: 'Se connecter' }))

        const nameInput = await screen.findByLabelText('Nom')
        fireEvent.change(nameInput, {
            target: { value: 'Alice' },
        })
        fireEvent.change(screen.getByLabelText('Email'), {
            target: { value: 'alice@example.com' },
        })
        fireEvent.click(
            screen.getByRole('button', { name: 'Valider la connexion' })
        )

        await waitFor(() => {
            expect(screen.getByText('Alice')).toBeInTheDocument()
        })
        expect(
            screen.getByRole('button', { name: 'Se déconnecter' })
        ).toBeInTheDocument()
    })
})
