import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../services/api"
import Feedback from "./components/Feedback"
import { useAuth } from "../../context/AuthContext"

export default function Login({ userEmail, userPassword }) {

    const navigate = useNavigate()

    const [email, setEmail] = useState(userEmail)
    const [password, setPassword] = useState(userPassword)
    
    const [status, setStatus] = useState('')
    const [message, setMessage] = useState('')

    const { setUser, loadUser } = useAuth()

    const handleEmail = (e) => {setEmail(() => e.target.value)}
    const handlePassword = (e) => {setPassword(() => e.target.value)}

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const formData = new URLSearchParams()
            
            formData.append('username', email)
            formData.append('password', password)

            const response = await api.post('/auth/login', formData)
            const { access_token, role, user } = response.data

            localStorage.setItem('access_token', access_token)
            localStorage.setItem('role', role)

            // Update context with user data
            setUser(user)

            setEmail("")
            setPassword("")

            setStatus('success')
            setMessage('Login Successful')

            // Load fresh user data from backend to ensure sync
            await loadUser()

            if (role === 'superadmin') {
                setTimeout(() => navigate('/superadmin'), 1500)
            } else if (role === 'admin') {
                setTimeout(() => navigate('/admin'), 1500)
            }else {
                setTimeout(() => navigate('/home'), 1500)
            }

        } catch (err) {
            setStatus('error')
            setMessage('Invalid Credentials')
        }
    }

    return (
        <>
            <div>
                <div>
                    <Feedback 
                        status={ status }
                        message={ message }
                    />
                </div>
                <form 
                    className='flex flex-col bg-white py-5 px-5 rounded-[0.5vw] border-2 w-2xl gap-y-3'
                    onSubmit={ handleSubmit }
                >
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
                    >Login</button>
                </form>
            </div>
        </>
    )
}