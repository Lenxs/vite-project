import { fireEvent, render, screen } from '@testing-library/react'
import MainForm from './MainForm.tsx'

describe('MainForm', () => {
    it('soumet les valeurs du formulaire principal', () => {
        const onSubmit = jest.fn()
        render(<MainForm onSubmit={onSubmit} />)

        fireEvent.change(screen.getByLabelText('Nom'), {
            target: { value: 'Bob' },
        })
        fireEvent.change(screen.getByLabelText('Email'), {
            target: { value: 'bob@example.com' },
        })
        fireEvent.click(screen.getByRole('button', { name: 'Ajouter' }))

        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit).toHaveBeenCalledWith('Bob', 'bob@example.com')
    })
})
