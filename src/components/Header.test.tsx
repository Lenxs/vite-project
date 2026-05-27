import { render, screen } from '@testing-library/react'
import Header from './Header.tsx'

describe('Header', () => {
    it('affiche le titre et le sous-titre', () => {
        render(<Header title="Titre principal" subtitle="Sous titre" />)

        expect(
            screen.getByRole('heading', { name: 'Titre principal', level: 1 })
        ).toBeInTheDocument()
        expect(screen.getByText('Sous titre')).toBeInTheDocument()
    })
})
