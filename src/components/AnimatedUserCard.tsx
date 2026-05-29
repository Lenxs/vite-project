import { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import UserCard from './UserCard.tsx'
import type { User } from '../types/user.ts'

interface AnimatedUserCardProps {
    user: User
    onRemove: (id: number) => void
    in?: boolean
    onEnter?: () => void
    onEntered?: () => void
    onExit?: () => void
    onExited?: () => void
}

const AnimatedUserCard = ({
    user,
    onRemove,
    in: inProp,
    onEnter,
    onEntered,
    onExit,
    onExited,
}: AnimatedUserCardProps) => {
    const nodeRef = useRef<HTMLDivElement>(null)

    return (
        <CSSTransition
            in={inProp}
            onEnter={onEnter}
            onEntered={onEntered}
            onExit={onExit}
            onExited={onExited}
            nodeRef={nodeRef}
            classNames="fade"
            timeout={300}
        >
            <div ref={nodeRef} className="users-list-item">
                <UserCard user={user} />
                <button type="button" onClick={() => onRemove(user.id)}>
                    Supprimer
                </button>
            </div>
        </CSSTransition>
    )
}

export default AnimatedUserCard
