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
import { axiosInstance } from './utils/axios'
import Cookies from 'universal-cookie'

import Navbar from './components/NavBar'

function App() {
    const { state, dispatch } = useContext(GlobalContext)
    const cookies = new Cookies()

    onAuthStateChanged(auth, user => {
        if (user && state.isAuthenticated != true) {
            // Ensures user is not authenticated if jwt cookie does not exist
            if (cookies.get('jwt') === undefined) {
                return dispatch({ type: 'UNAUTHENTICATE' })
            }

            axiosInstance.defaults.headers.common['Authorization'] =
                cookies.get('jwt')
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
            element: <Dashboard />,
        },
        {
            path: '/coursehub',
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

    return (
        <>
            <Navbar />
            <RouterProvider router={router} />
        </>
    )
}

export default App
