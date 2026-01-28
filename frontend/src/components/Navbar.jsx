import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <>
            <div className='
                    flex justify-between 
                    px-5 lg:px-10 py-3 
                    items-center'>
                <div className="flex gap-x-4">
                    <img src="/cap.png" alt="Cap Icon" className="w-10" />
                    <h1 className='text-3xl font-bold'><Link to={'/'}>Scholars PH</Link></h1>
                </div>
                <div className='flex gap-x-5'>
                    <button className='bg-[#393e41] rounded-full px-6 py-1 font-bold text-white'>
                        <Link to={'/login'}>Login</Link>
                    </button>
                    <button className='bg-[#e94f37] rounded-full px-6 py-1 font-bold text-white'>
                        <Link to={'/register'}>Get Started!</Link>
                    </button>
                </div>
            </div>
        </>
    )
}