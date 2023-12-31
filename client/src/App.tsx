import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Landing from './pages/Landing/Landing'
import Dashboard from './pages/Dashboard/Dashboard'
import CourseHub from './pages/CourseHub/CourseHub'
import About from './pages/About/About'
import FAQ from './pages/FAQ/FAQ'
import Protected from './components/Protected'
import { useContext, useEffect } from 'react'
import { GlobalContext } from './contexts/GlobalContext'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, fetchJWT } from './services/auth'
import { axiosInstance } from './utils/axios'
import Cookies from 'universal-cookie'

import Navbar from './components/NavBar'

function App() {
    const { state, dispatch } = useContext(GlobalContext)
    const cookies = new Cookies()

    useEffect(() => {
        onAuthStateChanged(auth, async user => {
            if (user && state.isAuthenticated != true) {
                let jwt
                if (cookies.get('jwt')) {
                    jwt = cookies.get('jwt')
                } else {
                    jwt = await fetchJWT(user.uid)
                    console.log(jwt)
                }

                if (jwt) {
                    axiosInstance.defaults.headers.common['Authorization'] = jwt
                    return dispatch({ type: 'AUTHENTICATE' })
                }
            }

            if (state.isAuthenticated && cookies.get('jwt') === undefined) {
                return dispatch({ type: 'UNAUTHENTICATE' })
            }

            if (!user && state.isAuthenticated != false) {
                dispatch({ type: 'UNAUTHENTICATE' })
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
            {state.isAuthenticated && <Navbar />}
            <RouterProvider router={router} />
        </>
    )
}

export default App
