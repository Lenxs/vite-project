import './App.css'

interface UserCardProps {
    name: string
    age: number
    role?: 'admin' | 'user'
}

const UserCard: React.FC<UserCardProps> = ({ name, age, role = 'user' }) => {
    return (
        <div>
            <h2>{name}</h2>
            <p>
                {age} ans . {role}
            </p>
        </div>
    )
}

function App() {
    return (
        <>
            <UserCard name="Jiri" age={35} />
            <UserCard name="Khalil" age={37} />
        </>
    )
}

export default App
