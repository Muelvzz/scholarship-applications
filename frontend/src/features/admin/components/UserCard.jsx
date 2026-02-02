export default function UserCard({ userList }) {
    return (
        <>
            <div className="
                px-10 flex flex-col mt-5
            ">
                <div>
                    {userList.map((user, idx) => (
                        <div key={ idx }>
                            <div 
                                className="
                                    cursor-pointer duration-300 hover:font-bold
                                    hover:bg-[#2b3033]
                                ">
                                <div className="
                                    p-3 flex justify-between
                                    items-center
                                ">
                                    <div className="text-left">
                                        <div className="font-bold">{`${user.first_name} ${user.last_name}`}</div>
                                        <div className="italic">{ user.email }</div>
                                    </div>
                                    <button>
                                        <img 
                                            src="/edit.png" alt="Edit Icon"
                                            className="
                                                w-11 rounded-lg p-1
                                                duration-300 hover:bg-white focus:bg-white
                                                active:bg-white" 
                                        />
                                    </button>
                                </div>
                                <hr />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}