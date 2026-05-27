import { useState } from 'react'
import './App.css'
import Header from './components/Header.tsx'
import MainForm from './components/MainForm.tsx'
import UserCard from './components/UserCard.tsx'
import type { User } from './types/user.ts'

function App() {
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
        <main className="app">
            <Header
                title="Mon application fil rouge"
                subtitle="Module 2 - TypeScript et tests"
            />
            <MainForm onSubmit={handleAddUser} />
            <section aria-label="Liste des utilisateurs">
                {users.length === 0 ? (
                    <p>Aucun utilisateur pour le moment.</p>
                ) : (
                    users.map((user) => <UserCard key={user.id} user={user} />)
                )}
            </section>
        </main>
    )
}

export default App
