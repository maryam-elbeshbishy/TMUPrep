import React, { createContext, useReducer } from 'react'

type InitialStateType = {
    isAuthenticated: boolean | null
}

type GlobalAction = {
    type: string
    payload?: boolean
}

const initialState: InitialStateType = {
    isAuthenticated: null,
}

const Reducer = (
    state: InitialStateType,
    action: GlobalAction,
): InitialStateType => {
    switch (action.type) {
        case 'AUTHENTICATE':
            return {
                ...state,
                isAuthenticated: true,
            }
        case 'UNAUTHENTICATE':
            return {
                ...state,
                isAuthenticated: false,
            }
        default:
            return state
    }
}

export const GlobalContext = createContext<{
    state: InitialStateType
    dispatch: React.Dispatch<GlobalAction>
}>({
    state: initialState,
    dispatch: () => null,
})

export const GlobalContextProvider = ({
    children,
}: {
    children: React.ReactElement
}) => {
    const [state, dispatch] = useReducer(Reducer, initialState)

    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    )
}
