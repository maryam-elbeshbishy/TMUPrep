import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Landing from './pages/Landing/Landing'
import Dashboard from './pages/Dashboard/Dashboard'
import CourseHub from './pages/CourseHub/CourseHub'
import About from './pages/About/About'
import FAQ from './pages/FAQ/FAQ'

import Navbar from './components/NavBar'
import { Fragment } from 'react'

function App() {
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
            path: '/hub',
            element: <CourseHub />,
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
        <Fragment>
            <Navbar />
            <RouterProvider router={router} />
        </Fragment>
    )
}

export default App
