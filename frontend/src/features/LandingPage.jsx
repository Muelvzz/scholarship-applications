import { Link } from 'react-router-dom'

export default function LandingPage() {
    return (
        <>
            <div class='flex flex-col h-screen px-5 py-5 bg-linear-to-r from-gray-400 to-gray-900 items-center justify-center'>
                <div>
                    <h1 class='text-7xl font-bold'>Scholars PH</h1>
                </div>
                <div>
                    <h3 class='italic font-semibold underline'>"Scholarship Application for College Students"</h3>
                </div>
                <div class='mt-8 gap-5 flex justify-center'>
                    <div>
                        <button class='cursor-pointer bg-white text-black px-5 py-2 font-bold rounded-[0.5vw] transition-transform duration-300 hover:scale-110'>
                            <Link to={ '/login' }>Login</Link>
                        </button>
                    </div>
                    <div>
                        <button class='cursor-pointer bg-white text-black px-5 py-2 font-bold rounded-[0.5vw] transition-transform duration-300 hover:scale-110'>
                            <Link to={ '/register' }>Register</Link>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}