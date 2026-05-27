interface HeaderProps {
    lang: 'FR' | 'EN'
}

const Header: React.FC<HeaderProps> = ({ lang='FR' })=>{
    return(
        <>
        <h1>My Super APP</h1>
        <p>copy wish of My Thread Applicaiton</p>
            <div>
                <button>Home</button>
                <button>Dashboard</button>
                <select value={lang}></select>
            </div>
        </>
    )
}