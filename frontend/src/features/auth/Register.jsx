import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import api from "../../services/api"
import Feedback from "../../components/Feedback"

export default function Register() {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')

    const [status, setStatus] = useState('idle')
    const [message, setMessage] = useState('')

    async function registerUser(registerData) {
        const res = await api.post('/auth/register', registerData)
    }

    const handleEmail = (e) => {
        setEmail(() => e.target.value)
    }

    const handleFirstName = (e) => {
        setFirstName(() => e.target.value)
    }

    const handleLastName = (e) => {
        setLastName(() => e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(() => e.target.value)
    }

    const handleSubmit = () => {
        event.preventDefault()

        try {
            const registerData = {
                email: email, 
                first_name: firstName, 
                last_name: lastName, 
                password: password,
            }

            registerUser(registerData)

            setEmail("")
            setFirstName("")
            setLastName("")
            setPassword("")

            setStatus('success')
            setMessage('Registration successful! Redirecting...')

            setTimeout(() => navigate('/login'), 1500)
        } catch (err) {
            setStatus('error')
            setMessage('Email already exists')
        }
    }

    return (
        <>
            <div className='flex flex-col h-screen bg-gray-800 items-center justify-center'>
                <div>
                    <Feedback 
                        status={ status }
                        message={ message }
                    />
                    <form 
                        className='flex flex-col bg-white py-5 px-5 rounded-[0.5vw] border-2 w-2xl gap-y-3'
                        onSubmit={ handleSubmit }
                    >
                        <div className='flex justify-between gap-x-5'>
                            <div className='flex flex-1 items-center'>
                                <label className='font-semibold flex-1'>First Name: </label>
                                <input 
                                    className='border rounded-[0.5vw] py-0.75 px-1 flex-2' 
                                    type="text" 
                                    placeholder="Enter your first name..."
                                    onChange={ handleFirstName }
                                    value={ firstName }
                                />
                            </div>
                            <div className='flex flex-1 items-center'>
                                <label className='font-semibold flex-1'>Last Name: </label>
                                <input 
                                    className='border rounded-[0.5vw] py-0.75 px-1 flex-2' 
                                    type="text" 
                                    placeholder="Enter your last name..."
                                    onChange={ handleLastName }
                                    value={ lastName }
                                />
                            </div>
                        </div>
                        <label className='font-semibold'>Email:</label>
                        <input 
                            className='border rounded-[0.5vw] py-0.75 px-1' 
                            type="text" 
                            placeholder="Enter your email..."
                            onChange={ handleEmail }
                            value={ email }
                        />
                        <label className='font-semibold'>Password:</label>
                        <input 
                            className='border rounded-[0.5vw] py-0.75 px-1' 
                            type="password" 
                            placeholder="Enter your password"
                            onChange={ handlePassword }
                            value={ password }
                        />
                        <button 
                            className='cursor-pointer text-white py-2 font-bold rounded-[0.5vw] text-center bg-black'
                        >Register</button>

                        <Link className='hover:underline text-center font-semibold' to={ '/login' }>Already have an account?</Link>
                    </form>
                </div>
            </div>
        </>
    )
}