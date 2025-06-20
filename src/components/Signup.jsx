import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthCOntext';
import { useState } from 'react';


const Signup = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState('')

    const {session, signUpNewUser} = UserAuth()
    const navigate = useNavigate()

    console.log(email, password)

    const handleSignup = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const result = await signUpNewUser(email, password)

            if(result.success) {
                navigate('/dashboard')
            }
        } catch (error) {
            setError("an error occurred")
        } finally {
            setLoading(false)
        }
    }

    return(
    <div>
    <form onSubmit={handleSignup} className='max-w-md m-auto pt-24'>
        <h2 className='font-bold pb-2'>Sign up today!</h2>
        <p>Already have an account? <Link to='/signin'>Sign in!</Link></p>
        <div className='flex flex-col py-4'>
            <input onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='p-3 mt-4' type="email"  />
            <input onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='p-3 mt-4' type="password" />
            <button type='submit' disabled={loading} className='mt-4 w-full'>Sign Up</button>
            {error && <p className='text-red-600 text-center pt-4'>{error}</p>}
        </div>
    </form>
    </div>)
}


export default Signup
