import { render, screen, waitFor } from '@testing-library/react'
import UsersPanel from './UsersPanel.tsx'

jest.mock('../hooks/useAuth.ts', () => ({
    useAuth: jest.fn(),
}))

import { useAuth } from '../hooks/useAuth.ts'

const mockedUseAuth = useAuth as jest.MockedFunction<typeof useAuth>

describe('UsersPanel', () => {
    beforeEach(() => {
        jest.restoreAllMocks()
        mockedUseAuth.mockReturnValue({
            user: { id: 1, name: 'Test', email: 'test@example.com' },
            isAuthenticated: true,
            login: jest.fn(),
            logout: jest.fn(),
        })
    })

    it('affiche les utilisateurs distants quand on est connecté', async () => {
        globalThis.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: async () => [
                { id: 1, name: 'Leanne Graham', email: 'leanne@example.com' },
            ],
        }) as jest.Mock

        render(<UsersPanel />)

        await waitFor(() => {
            expect(screen.getByText(/Leanne Graham/)).toBeInTheDocument()
        })
    })

    it('demande la connexion quand on est déconnecté', () => {
        mockedUseAuth.mockReturnValue({
            user: null,
            isAuthenticated: false,
            login: jest.fn(),
            logout: jest.fn(),
        })

        render(<UsersPanel />)

        expect(
            screen.getByText(/Connectez-vous pour charger les utilisateurs/)
        ).toBeInTheDocument()
    })
})