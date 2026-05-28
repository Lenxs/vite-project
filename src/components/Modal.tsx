import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
    isOpen: boolean
    title: string
    onClose: () => void
    children: ReactNode
}

const Modal = ({ isOpen, title, onClose, children }: ModalProps) => {
    useEffect(() => {
        if (!isOpen) {
            return
        }

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose()
            }
        }

        document.addEventListener('keydown', handleEscape)

        return () => {
            document.removeEventListener('keydown', handleEscape)
        }
    }, [isOpen, onClose])

    if (!isOpen) {
        return null
    }

    return createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal-content"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                onClick={(event) => event.stopPropagation()}
            >
                <header className="modal-header">
                    <h2 id="modal-title">{title}</h2>
                    <button
                        type="button"
                        className="modal-close"
                        onClick={onClose}
                    >
                        Fermer
                    </button>
                </header>
                <div className="modal-body">{children}</div>
            </div>
        </div>,
        document.body
    )
}

export default Modal
