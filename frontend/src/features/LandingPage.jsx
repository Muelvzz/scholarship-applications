import { Link } from 'react-router-dom'

export default function LandingPage() {

    const buttonStyle = 'cursor-pointer bg-white text-black px-5 py-2 font-bold rounded-[0.5vw] transition-transform duration-300 hover:scale-110'

    return (
        <>
            <div className="flex flex-col h-screen bg-gray-800 items-center justify-center bg-[url('/cap.png')] bg-no-repeat bg-center">
                <div>
                    <h1 className='text-8xl font-bold text-white'>Scholars PH</h1>
                </div>
                <div>
                    <h3 className='italic font-semibold underline text-white'>"Scholarship Application for College Students"</h3>
                </div>
                <div className='mt-8 gap-5 flex justify-center'>
                    <div>
                        <button className={`${buttonStyle}`}>
                            <Link to={ '/login' }>Login</Link>
                        </button>
                    </div>
                    <div>
                        <button className={`${buttonStyle}`}>
                            <Link to={ '/register' }>Register</Link>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}