import React, { useState, useEffect, useRef } from 'react'
import Login from '../features/auth/Login'
import Register from '../features/auth/Register'
import LandingNavBar from '../components/LandingNavBar'

export default function LandingPage() {

    const [width, setWidth] = useState(window.innerWidth)
    const [isRegister, setIsRegister] = useState(false)
    const [isLogin, setIsLogin] = useState(false)

    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')

    const sectionRef = useRef(null)

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth)

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        if (isRegister || isLogin) {
            scrollToSection()
        }
    }, [isRegister, isLogin])

    const scrollToSection = () => {
        if (sectionRef.current) {
            sectionRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        }
    }

    if (width >= 1023) {
        return (
            <>
                <LandingNavBar
                    setIsRegister={setIsRegister}
                    setIsLogin={setIsLogin}
                />

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

                    <div className='flex-1'>
                        {!isLogin && !isRegister ? (
                                <div className='flex justify-center items-center'>
                                    <img src="/cap.png" alt="Cap Logo"/>
                                </div>
                        ): isLogin ? (
                            <Login 
                                userEmail={userEmail}
                                userPassword={userPassword}
                            />
                        ): (
                            <Register 
                                setIsLogin={setIsLogin}
                                setIsRegister={setIsRegister}
                                setUserEmail={setUserEmail}
                                setUserPassword={setUserPassword}
                            />
                        )}
                    </div>

                </div>
            </>
        )
    }

    return (
        <>
            <LandingNavBar
                setIsRegister={setIsRegister}
                setIsLogin={setIsLogin}
            />

            <div className='bg-[#393e41] p-5'>
                <div className='
                        flex flex-1 flex-col
                        h-screen justify-center items-center'>

                    <div className='
                            flex flex-1 flex-col justify-center items-center 
                            text-white text-center'>
                        <p className='font-bold text-5xl mb-8'>
                            <u>Scholarship Application</u> for <br /> Filipino Students
                        </p>
                        <button className='
                                bg-[#e94f37] text-2xl font-bold
                                rounded-full px-12 py-4 
                                cursor-pointer transition-transform duration-300 hover:scale-110'
                                onClick={() => {
                                    setIsRegister(true)
                                    setIsLogin(false)
                                    scrollToSection()}
                                }
                        >
                            Get Started!
                        </button>
                    </div>

                </div>

                    {isLogin && !isRegister ? (
                        <div 
                            className='flex-1 flex justify-center items-center p-5 h-screen'
                            ref={sectionRef}
                        >
                            <Login 
                                userEmail={userEmail}
                                userPassword={userPassword}
                            />
                        </div>
                    ): !isLogin && isRegister ? (
                        <div 
                            className='flex-1 flex justify-center items-center p-5 h-screen'
                            ref={sectionRef}
                        >
                            <Register 
                                setIsLogin={setIsLogin}
                                setIsRegister={setIsRegister}
                                setUserEmail={setUserEmail}
                                setUserPassword={setUserPassword}
                            />
                        </div>
                    ): ""}
            </div>
        </>
    )
}