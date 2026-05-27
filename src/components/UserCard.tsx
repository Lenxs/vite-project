import type { User } from '../types/user'

interface UserCardProps {
    user: User
}

const UserCard = ({ user }: UserCardProps) => {
    return (
        <article>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
        </article>
    )
}

export default UserCard
