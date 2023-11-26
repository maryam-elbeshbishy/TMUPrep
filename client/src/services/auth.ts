import {
    GoogleAuthProvider,
    getAuth,
    signInWithRedirect,
    getRedirectResult,
    signOut,
} from '@firebase/auth'
import app from '../utils/firebase'
import { axiosInstance } from '../utils/axios'

const provider = new GoogleAuthProvider()
export const auth = getAuth(app)

export const logIn = async () => {
    signInWithRedirect(auth, provider)
    getRedirectResult(auth).catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
    })
}

export const logOut = () => {
    signOut(auth)
        .then(() => {
            console.log('successfully signed out')
        })
        .catch(error => {
            console.log(error)
        })
}

export const fetchJWT = async (googleID: string) => {
    try {
        const res = await axiosInstance.post('/login', { googleID: googleID })
        return res.data['jwt']
    } catch (error) {
        console.log(error)
        return null
    }
}
