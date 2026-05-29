import { memo } from 'react'
import type { User } from '../types/user'

interface UserCardProps {
    user: User
}

const UserCard = memo(({ user }: UserCardProps) => {
    return (
        <article>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
        </article>
    )
})

UserCard.displayName = 'UserCard'

export default UserCard
