import { useMemo, type ReactNode } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

interface PageTransitionProps {
    transitionKey: string
    children: ReactNode
}

const PageTransition = ({ transitionKey, children }: PageTransitionProps) => {
    const nodeRef = useMemo(
        () => ({
            current: null as HTMLDivElement | null,
        }),
        [transitionKey]
    )

    return (
        <div className="page-transition-wrapper">
            <TransitionGroup component={null}>
                <CSSTransition
                    key={transitionKey}
                    nodeRef={nodeRef}
                    classNames="fade"
                    timeout={300}
                    unmountOnExit
                >
                    <div ref={nodeRef} className="page-transition-page">
                        {children}
                    </div>
                </CSSTransition>
            </TransitionGroup>
        </div>
    )
}

export default PageTransition
