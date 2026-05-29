import { memo } from 'react'

interface HeaderProps {
    title: string
    subtitle: string
}

const Header = memo(({ title, subtitle }: HeaderProps) => {
    return (
        <header>
            <h1>{title}</h1>
            <p>{subtitle}</p>
        </header>
    )
})

Header.displayName = 'Header'

export default Header
