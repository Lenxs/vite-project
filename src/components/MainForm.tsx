import { useState } from 'react'
import type { SubmitEvent } from 'react'

interface MainFormProps {
    onSubmit: (name: string, email: string) => void
}

const MainForm = ({ onSubmit }: MainFormProps) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()

        onSubmit(name, email)

        setName('')
        setEmail('')
    }

    return (
        <form onSubmit={handleSubmit} method="POST">
            <div>
                <div>
                    <label htmlFor="name">Nom</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        required
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        value={email}
                        required
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
            </div>

            <div>
                <button type="submit">Ajouter</button>
            </div>
        </form>
    )
}

export default MainForm
