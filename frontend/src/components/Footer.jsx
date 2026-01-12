export default function Footer() {
    return (
        <>
            <div class='bg-black text-white px-5 py-5 flex justify-between items-center'>
                <div>
                    <h1 class='text-3xl font-bold'>Scholars PH</h1>
                </div>
                <div class='flex items-center gap-4'>
                    <button class='
                        size-9 
                        cursor-pointer 
                        transition-transform duration-300 
                        hover:scale-125'
                    >
                        <a href="https://www.reddit.com/user/Lopez_Muelbs/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button">
                            <img src="\reddit.png" alt="Reddit Icon" />
                        </a>
                    </button>

                    <button class='
                        size-10 
                        transition-transform duration-300 
                        hover:scale-125'
                    >
                        <a href="">
                            <img src="\discord.png" alt="Discord Icon" />
                        </a>
                    </button>

                    <button class='
                        size-9 
                        transition-transform duration-300 
                        hover:scale-125'
                    >
                        <a href="https://www.linkedin.com/in/psalm-muelvin-lopez-003a78227/">
                            <img src="\linkedin.png" alt="LinkedIn Icon" />
                        </a>
                    </button>

                    <button class='
                        size-9
                        transition-transform duration-300 
                        hover:scale-125'
                    >
                        <a href="https://x.com/Muelvzz">
                            <img src="\x.png" alt="X Icon" />
                        </a>
                    </button>
                </div>
            </div>
        </>
    )
}