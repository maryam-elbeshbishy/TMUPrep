import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Landing from './pages/Landing/Landing'
import Dashboard from './pages/Dashboard/Dashboard'
import CourseHub from './pages/CourseHub/CourseHub'
import About from './pages/About/About'
import FAQ from './pages/FAQ/FAQ'
import Protected from './components/Protected'
import { useContext } from 'react'
import { GlobalContext } from './contexts/GlobalContext'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './services/auth'

function App() {
    const { state, dispatch } = useContext(GlobalContext)

    onAuthStateChanged(auth, user => {
        if (user && state.isAuthenticated != true) {
            dispatch({ type: 'AUTHENTICATE' })
        } else if (!user && state.isAuthenticated != false) {
            dispatch({ type: 'UNAUTHENTICATE' })
        }
    })

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Landing />,
        },
        {
            path: '/dashboard',
            element: <Protected children={<Dashboard />} />,
        },
        {
            path: '/hub',
            element: <Protected children={<CourseHub />} />,
        },
        {
            path: '/about',
            element: <About />,
        },
        {
            path: '/faq',
            element: <FAQ />,
        },
    ])

    return <RouterProvider router={router} />
}

export default App
