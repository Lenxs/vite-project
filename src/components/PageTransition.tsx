import { CSSTransition } from 'react-transition-group'
import { useRef } from 'react'

interface PageTransitionProps {
    children: React.ReactNode
    location?: string
}

const PageTransition = ({ children, location }: PageTransitionProps) => {
    const nodeRef = useRef(null)

    return (
        <CSSTransition
            in={true}
            timeout={300}
            classNames="page"
            unmountOnExit={false}
            key={location}
            nodeRef={nodeRef}
        >
            <div ref={nodeRef} className="page-transition-wrapper">
                {children}
            </div>
        </CSSTransition>
    )
}

export default PageTransition
