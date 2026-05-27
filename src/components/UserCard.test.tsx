import { render, screen } from '@testing-library/react'
import UserCard from './UserCard.tsx'

describe('UserCard', () => {
    it('affiche les infos utilisateur', () => {
        render(
            <UserCard
                user={{
                    id: 1,
                    name: 'Alice Martin',
                    email: 'alice@example.com',
                }}
            />
        )

        expect(
            screen.getByRole('heading', { name: 'Alice Martin' })
        ).toBeInTheDocument()
        expect(screen.getByText('alice@example.com')).toBeInTheDocument()
    })
})
