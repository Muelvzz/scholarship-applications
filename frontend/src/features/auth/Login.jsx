import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleEmail = (e) => {
        e.preventDefault()
        setEmail(() => e.target.value)
    }

    const handlePassword = (e) => {
        e.preventDefault()
        setPassword(() => e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(`email: ${email}, password: ${password}`)

        setEmail("")
        setPassword("")

        navigate('/home')
    }

    return (
        <>
            <div class='flex flex-col h-screen bg-linear-to-r from-gray-400 to-gray-900 items-center justify-center'>
                <div>
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