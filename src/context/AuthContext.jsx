import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "../supabaseClient";


const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [session, setSession] = useState(undefined)

    // Sign Up
    const signUpNewUser = async (email, password) => {
        const {data, error} = await supabase.auth.signUp({
            email: email,
            password: password
        })

        if (error) {
            console.error("there was a problem signing up:", error)
            return {success: false, error}
        }
        return {success: true, data}
    }

    // Sign In
    const signInUser = async (email, password) => {
        try {
            const {data, error} = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            })
            if (error) {
                console.error("there was an error occurred:", error)
                return {success: false, error: error}
            }
            console.log("sign-in success", data)
            return {success: true, data}
            
        } catch (error) {
            console.log("an error ocurred: ", error)
        }
    }

    useEffect(() => {
        supabase.auth.getSession().then(({data: {session}}) => {
            setSession(session)
        })
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    // Sign Out
    const signOut = () => {
        const {error} = supabase.auth.signOut()
    if (error) {
            console.error("there was a problem signing up:", error)
        }
    }

    return (
        <AuthContext.Provider value={{session, signUpNewUser, signOut, signInUser}}>
            {children}
        </AuthContext.Provider>   
    )

    
}

export const UserAuth = () => {
    return useContext(AuthContext)
}