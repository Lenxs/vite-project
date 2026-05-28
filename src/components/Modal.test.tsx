import { fireEvent, render, screen } from '@testing-library/react'
import Modal from './Modal.tsx'

describe('Modal', () => {
    it('affiche le contenu via un portal', () => {
        render(
            <Modal isOpen title="Titre modal" onClose={() => {}}>
                <p>Contenu de la modal</p>
            </Modal>
        )

        expect(
            screen.getByRole('dialog', { name: 'Titre modal' })
        ).toBeInTheDocument()
        expect(screen.getByText('Contenu de la modal')).toBeInTheDocument()
    })

    it('appelle onClose au clic sur le bouton fermer', () => {
        const onClose = jest.fn()

        render(
            <Modal isOpen title="Fermeture" onClose={onClose}>
                <p>Test</p>
            </Modal>
        )

        fireEvent.click(screen.getByRole('button', { name: 'Fermer' }))
        expect(onClose).toHaveBeenCalledTimes(1)
    })
})
