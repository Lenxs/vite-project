import { useState } from 'react'
import MainForm from './MainForm.tsx'
import type { User } from '../types/user.ts'
import { TransitionGroup } from 'react-transition-group'
import AnimatedUserCard from './AnimatedUserCard.tsx'

const LocalUsersSection = () => {
    const [users, setUsers] = useState<User[]>([])

    const handleAddUser = (name: string, email: string) => {
        const newUser: User = {
            id: users.length + 1,
            name,
            email,
        }
        setUsers((prevUsers) => [...prevUsers, newUser])
    }

    const handleRemoveUser = (id: number) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id))
    }

    return (
        <>
            <MainForm onSubmit={handleAddUser} />
            <section aria-label="Liste des utilisateurs locaux">
                <h2>Mes utilisateurs locaux</h2>
                {users.length === 0 ? (
                    <p>Aucun utilisateur local pour le moment.</p>
                ) : (
                    <TransitionGroup component="div" className="users-list">
                        {users.map((user) => (
                            <AnimatedUserCard
                                key={user.id}
                                user={user}
                                onRemove={handleRemoveUser}
                            />
                        ))}
                    </TransitionGroup>
                )}
            </section>
        </>
    )
}

export default LocalUsersSection
