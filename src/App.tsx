import './App.css'
import AuthBar from './components/AuthBar.tsx'
import Header from './components/Header.tsx'
import { BrowserRouter } from 'react-router-dom'
import AppNav from './components/AppNav.tsx'
import AnimatedRoutes from './routes/AnimatedRoutes.tsx'

const App = () => {
    return (
        <BrowserRouter>
            <main className="app">
                <Header
                    title="Mon application fil rouge"
                    subtitle="Module 6 - Transitions d'écrans fluides"
                />
                <AppNav />
                <AuthBar />
                <AnimatedRoutes />
            </main>
        </BrowserRouter>
    )
}

export default App
