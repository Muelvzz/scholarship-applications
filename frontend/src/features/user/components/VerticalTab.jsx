export default function VerticalTab({ verticalTab, setVerticalTab }) {

    const imageStyle = 'w-9 lg:py-4'

    const buttonStyle = `hover:bg-white duration-300 cursor-pointer 
                        px-4 py-2 w-full flex justify-center`

    const handleToggle = (index) => {
        setVerticalTab(prev => prev.map((_, i) => i === index))
    }

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
                            lg:rounded-tl-xl lg:rounded-tr-xl rounded
                            ${ verticalTab[0] && 'bg-white' }`}
                            title="Create Scholarship"
                            onClick={() => handleToggle(0)}
                        >
                            <img 
                                src="/create.png" alt="Create Scholarship Icon"
                                className={ imageStyle }
                            />
                        </button>

                        <button
                            className={`${ buttonStyle } 
                                ${ verticalTab[1] && 'bg-white' }`}
                            title="View Scholarship"
                            onClick={() => handleToggle(1)}
                        >
                            <img 
                                src="/view.png" alt="View Scholarship Icon" 
                                className={ imageStyle }
                            />
                        </button>

                        <button
                            className={`${ buttonStyle } 
                                ${ verticalTab[2] && 'bg-white' }`}
                            title="View Users"
                            onClick={() => handleToggle(2)}
                        >
                            <img 
                                src="/view-users.png" alt="View Users Icon" 
                                className={ imageStyle }
                            />
                        </button>

                        <button
                            className={`${ buttonStyle } 
                            lg:rounded-bl-xl lg:rounded-br-xl
                            ${ verticalTab[3] && 'bg-white' }`}
                            title="My Account"
                            onClick={() => handleToggle(3)}
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