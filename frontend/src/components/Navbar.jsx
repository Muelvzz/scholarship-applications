export default function Navbar() {
    return (
        <>
            <div class='bg-black text-white px-5 py-5 flex justify-between items-center'>
                <div>
                    <h1 class='text-3xl font-bold'>Scholars PH</h1>
                </div>
                <div class='flex'>
                    <button class='cursor-pointer bg-white text-black px-3 py-1 font-bold rounded-full transition-transform duration-300 hover:scale-110'>About Me</button>
                </div>
            </div>
        </>
    )
}