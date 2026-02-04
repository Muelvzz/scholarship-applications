export default function VerticalTab() {

    const imageStyle = 'w-9 lg:py-4'
    const buttonStyle = 'hover:bg-white duration-300 cursor-pointer px-4 py-2 w-full flex justify-center'

    return (
        <>
            <div>
                <div className="bg-[#2b3033] rounded-xl">
                    <div className="
                        flex flex-row lg:flex-col 
                        justify-around
                    ">
                        <button
                            className={`${ buttonStyle } 
                            lg:rounded-tl-xl lg:rounded-tr-xl rounded`}
                        >
                            <img 
                                src="/create.png" alt="Create Scholarship Icon"
                                className={ imageStyle }
                            />
                        </button>
                        <button
                            className={`${ buttonStyle }`}
                        >
                            <img 
                                src="/view.png" alt="View Scholarship Icon" 
                                className={ imageStyle }
                            />
                        </button>
                        <button
                            className={`${ buttonStyle }`}
                        >
                            <img 
                                src="/view-users.png" alt="View Users Icon" 
                                className={ imageStyle }
                            />
                        </button>
                        <button
                            className={`${ buttonStyle } 
                            lg:rounded-bl-xl lg:rounded-br-xl`}
                        >
                            <img 
                                src="/profile.png" alt="My Account Icon" 
                                className={ imageStyle }
                            />
                        </button>
                    </div>
                </div>
            </div>        
        </>
    )
}