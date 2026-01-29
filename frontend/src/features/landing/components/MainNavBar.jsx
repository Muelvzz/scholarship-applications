export default function Navbar() {
    return (
        <>
            <div className='
                    flex justify-between 
                    px-5 lg:px-10 py-3 
                    items-center'>
                <div className="flex gap-x-4">
                    <img src="/cap.png" alt="Cap Icon" className="w-10" />
                    <h1 className='text-3xl font-bold'>Scholars PH</h1>
                </div>
                <div className='flex gap-x-5'>
                    <button 
                        className='
                            bg-[#393e41] rounded-full px-6 py-1 
                            font-bold text-white cursor-pointer'
                    >
                        About Me
                    </button>
                </div>
            </div>
        </>
    )
}