export default function Footer() {

    // const buttonStyle = 'cursor-pointer transition-transform duration-300 hover:scale-125'

    // return (
    //     <>
    //         <div className='bg-black text-white px-5 py-5 flex justify-between items-center'>
    //             <div>
    //                 <h1 className='text-3xl font-bold'>Scholars PH</h1>
    //             </div>
    //             <div className='flex items-center gap-4'>
    //                 <button className={`size-9 ${buttonStyle}`}>
    //                     <a href="https://www.reddit.com/user/Lopez_Muelbs/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button">
    //                         <img src="\reddit.png" alt="Reddit Icon" />
    //                     </a>
    //                 </button>

    //                 <button className={`size-10 ${buttonStyle}`}>
    //                     <a href="">
    //                         <img src="\discord.png" alt="Discord Icon" />
    //                     </a>
    //                 </button>

    //                 <button className={`size-9 ${buttonStyle}`}>
    //                     <a href="https://www.linkedin.com/in/psalm-muelvin-lopez-003a78227/">
    //                         <img src="\linkedin.png" alt="LinkedIn Icon" />
    //                     </a>
    //                 </button>

    //                 <button className={`size-9 ${buttonStyle}`}>
    //                     <a href="https://x.com/Muelvzz">
    //                         <img src="\x.png" alt="X Icon" />
    //                     </a>
    //                 </button>
    //             </div>
    //         </div>
    //     </>
    // )

    return (
        <>
            <div className='
                    md:flex justify-between 
                    px-5 lg:px-10 py-3 
                    items-center'>
                <div className="flex gap-x-4">
                    <img src="/cap.png" alt="Cap Icon" className="w-10" />
                    <h1 className='text-3xl font-bold'>Scholars PH</h1>
                </div>

                <div className="flex justify-between">
                    <div className="font-semibold mr-6">
                        <p className="text-xl font-bold">Documentations</p>
                        <hr />
                        <ul className="flex flex-col md:text-right gap-y-3 mt-2">
                            <li><a href="https://www.reddit.com/user/Lopez_Muelbs/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button">My Repository</a></li>
                        </ul>
                    </div>

                    <div className="font-semibold mr-6">
                        <p className="text-xl font-bold">Contact Me</p>
                        <hr />
                        <ul className="flex flex-col md:text-right gap-y-3 mt-2">
                            <li><a href="https://www.reddit.com/user/Lopez_Muelbs/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button">Reddit</a></li>
                            <li><a href="https://www.linkedin.com/in/psalm-muelvin-lopez-003a78227/">LinkedIn</a></li>
                            <li><a href="https://x.com/Muelvzz">GitHub</a></li>
                            <li><a href="https://x.com/Muelvzz">X (Twitter)</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}