import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

export default function Register() {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')

    const handleEmail = (e) => {
        e.preventDefault()
        setEmail(() => e.target.value)
    }

    const handleFirstName = (e) => {
        e.preventDefault()
        setFirstName(() => e.target.value)
    }

    const handleLastName = (e) => {
        e.preventDefault()
        setLastName(() => e.target.value)
    }

    const handlePassword = (e) => {
        e.preventDefault()
        setPassword(() => e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(`
            email: ${email}, 
            firstName: ${firstName}, 
            lastName: ${lastName}, 
            password: ${password}`)

        setEmail("")
        setFirstName("")
        setLastName("")
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
                        <div class='flex justify-between gap-x-5'>
                            <div class='flex flex-1 items-center'>
                                <label class='font-semibold flex-1'>First Name: </label>
                                <input 
                                    class='border rounded-[0.5vw] py-0.75 px-1 flex-2' 
                                    type="text" 
                                    placeholder="Enter your first name..."
                                    onChange={ handleFirstName }
                                    value={ firstName }
                                />
                            </div>
                            <div class='flex flex-1 items-center'>
                                <label class='font-semibold flex-1'>Last Name: </label>
                                <input 
                                    class='border rounded-[0.5vw] py-0.75 px-1 flex-2' 
                                    type="text" 
                                    placeholder="Enter your last name..."
                                    onChange={ handleLastName }
                                    value={ lastName }
                                />
                            </div>
                        </div>
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
                        >Register</button>

                        <Link class='hover:underline text-center font-semibold' to={ '/login' }>Already have an account?</Link>
                    </form>
                </div>
            </div>
        </>
    )
}