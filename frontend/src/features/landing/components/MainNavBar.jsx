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
            </div>
        </>
    )
}