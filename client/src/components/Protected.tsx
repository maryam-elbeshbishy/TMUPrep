import React, { useContext } from 'react'
import { GlobalContext } from '../contexts/GlobalContext'
import { Navigate } from 'react-router'

const Protected = ({
    children,
}: {
    children: React.ReactElement
}): React.ReactElement => {
    const { state } = useContext(GlobalContext)

    if (state.isAuthenticated == null) return <></>
    return state.isAuthenticated ? <>{children}</> : <Navigate to="/" />
}

export default Protected
