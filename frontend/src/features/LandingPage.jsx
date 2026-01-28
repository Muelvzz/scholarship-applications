import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from '../features/auth/Login'
import Register from '../features/auth/Register'

export default function LandingPage() {

    const [width, setWidth] = useState(window.innerWidth)
    const [isRegister, setIsRegister] = useState(false)
    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth)

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    if (width >= 1023) {
        return (
            <>
                <div className='flex bg-[#393e41] h-screen items-center'>

                    <div className='
                            flex flex-col flex-1 
                            justify-center items-center 
                            text-white gap-y-8'>
                        <p className='font-bold text-5xl'><u>Scholarship Application</u> for <br /> Filipino Students</p>
                        <button className='
                                bg-[#e94f37] text-2xl font-bold
                                rounded-full px-12 py-4 
                                cursor-pointer transition-transform duration-300 hover:scale-110'
                                onClick={() => {setIsRegister(true), setIsLogin(false)}}
                                >
                            Get Started
                        </button>
                    </div>
                    {!isLogin && !isRegister ? (
                        <div className='flex-1'>
                            <div className='flex justify-center items-center'>
                                <img src="/cap.png" alt="Cap Logo"/>
                            </div>
                        </div>
                    ): isLogin ? (
                        <Login />
                    ): (
                        <Register />
                    )}

                </div>
            </>
        )
    }

    return (
        <>
            <div className='
                    flex flex-col bg-[#393e41] 
                    h-screen justify-center items-center'>

                <div className='
                        flex flex-col justify-center items-center 
                        text-white text-center'>
                    <p className='font-bold text-5xl mb-8'>
                        <u>Scholarship Application</u> for <br /> Filipino Students
                    </p>
                    <button className='
                            bg-[#e94f37] text-2xl font-bold
                            rounded-full px-12 py-4 
                            cursor-pointer transition-transform duration-300 hover:scale-110'>
                        <Link to={'/register'}>Get Started!</Link>
                    </button>
                </div>

            </div>
        </>
    )
}