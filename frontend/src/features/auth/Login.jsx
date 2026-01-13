import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../services/api"
import Feedback from "../../components/Feedback"

export default function Login() {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const [status, setStatus] = useState('')
    const [message, setMessage] = useState('')

    const handleEmail = (e) => {
        setEmail(() => e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(() => e.target.value)
    }

    const handleSubmit = async () => {
        event.preventDefault()

        try {
            const formData = new URLSearchParams
            
            formData.append('username', email)
            formData.append('password', password)

            const response = await api.post('/auth/login', formData)
            const { access_token } = response.data

            localStorage.setItem('access_token', access_token)

            setEmail("")
            setPassword("")

            setStatus('success')
            setMessage('Login Successful')

            setTimeout(() => navigate('/home'), 1500)
        } catch (err) {
            setStatus('error')
            setMessage('Invalid Credentials')
        }
    }

    return (
        <>
            <div class='flex flex-col h-screen bg-gray-800 items-center justify-center'>
                <div>
                    <Feedback 
                        status={ status }
                        message={ message }
                    />
                    <form 
                        class='flex flex-col bg-white py-5 px-5 rounded-[0.5vw] border-2 w-2xl gap-y-3'
                        onSubmit={ handleSubmit }
                    >
                        <label class='font-semibold'>Email:</label>
                        <input 
                            class='border rounded-[0.5vw] py-0.75 px-1' 
                            type="text" 
                            placeholder="Enter your email..."
                            onChange={ handleEmail }
                            value={ email }
                        />
                        <label class='font-semibold'>Password:</label>
                        <input 
                            class='border rounded-[0.5vw] py-0.75 px-1' 
                            type="password" 
                            placeholder="Enter your password"
                            onChange={ handlePassword }
                            value={ password }
                        />
                        <button 
                            class='cursor-pointer text-white py-2 font-bold rounded-[0.5vw] text-center bg-black'
                        >Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}