import {
    GoogleAuthProvider,
    getAuth,
    signInWithRedirect,
    getRedirectResult,
    signOut,
} from '@firebase/auth'
import app from '../utils/firebase'
import Cookies from 'universal-cookie'
import { axiosInstance } from '../utils/axios'

const provider = new GoogleAuthProvider()
export const auth = getAuth(app)
const cookies = new Cookies()

export const logIn = async () => {
    signInWithRedirect(auth, provider)
    getRedirectResult(auth)
        .then(async result => {
            const user = result?.user
            console.log('sign in successfull!')
            if (user) await fetchJWT(user.uid)
        })
        .catch(error => {
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

const fetchJWT = async (googleID: string) => {
    axiosInstance
        .post('/login', { id: googleID })
        .then(res => {
            console.log(res.data)
            cookies.set('jwt', res.data['jwt'])
        })
        .catch(error => {
            console.log(error)
        })
}
