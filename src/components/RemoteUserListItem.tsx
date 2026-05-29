import { memo } from 'react'

interface RemoteUserListItemProps {
    id: number
    name: string
    email: string
}

const RemoteUserListItem = memo(({ id, name, email }: RemoteUserListItemProps) => (
    <li key={id}>
        {name} - {email}
    </li>
))

export default RemoteUserListItem