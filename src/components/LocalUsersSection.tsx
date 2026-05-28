import { useState } from 'react'
import MainForm from './MainForm.tsx'
import UserCard from './UserCard.tsx'
import type { User } from '../types/user.ts'

function LocalUsersSection() {
    const [users, setUsers] = useState<User[]>([])

    const handleAddUser = (name: string, email: string) => {
        const newUser: User = {
            id: users.length + 1,
            name,
            email,
        }
        setUsers((prevUsers) => [...prevUsers, newUser])
    }

    return (
        <>
            <MainForm onSubmit={handleAddUser} />
            <section aria-label="Liste des utilisateurs locaux">
                <h2>Mes utilisateurs locaux</h2>
                {users.length === 0 ? (
                    <p>Aucun utilisateur local pour le moment.</p>
                ) : (
                    users.map((user) => <UserCard key={user.id} user={user} />)
                )}
            </section>
        </>
    )
}

export default LocalUsersSection
