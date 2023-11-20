import {
    GoogleAuthProvider,
    getAuth,
    signInWithRedirect,
    getRedirectResult,
    signOut,
} from '@firebase/auth'
import app from '../utils/firebase'

const provider = new GoogleAuthProvider()
export const auth = getAuth(app)

export const logIn = () => {
    signInWithRedirect(auth, provider)
    getRedirectResult(auth)
        .then(result => {
            const user = result?.user
            console.log('sign in successfull!')
            console.log(user)
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
