import { useState } from "react"
import UserUpdate from "./UserUpdate"
import UserDelete from "./UserDelete"

export default function UserCard({ userList, setRefresh, remove }) {

    const [update, setUpdate] = useState(false)

    const [userData, setUserData] = useState('')
    const [userIndex, setUserIndex] = useState(null)

    return (
        <>
            <div className="
                sm:px-10 flex flex-col mt-5
            ">
                <div>
                    {userList.map((user, idx) => (
                        <div key={ idx }>
                            <div 
                                className={`
                                    cursor-pointer duration-300 hover:font-bold hover:bg-[#2b3033]
                                `}>
                                <div className="
                                    p-3 flex justify-between
                                    items-center
                                ">
                                    <div className="text-left">
                                        <div className="font-bold">{`${user.first_name} ${user.last_name}`}</div>
                                        <div className="italic">{ user.email }</div>
                                    </div>

                                    {!remove ? (
                                        <button onClick={() => {
                                            setUpdate(prev => !prev), 
                                            setUserData(user),
                                            setUserIndex(idx)}}
                                        >
                                            <img 
                                                src={ !update ? '/edit.png' : '/close.png' } alt="Edit Icon"
                                                className="
                                                    w-11 rounded-lg p-1 duration-300 
                                                    hover:bg-white focus:bg-white active:bg-white" 
                                            />
                                        </button>
                                    ) : (<UserDelete 
                                        user={ user }
                                        setRefresh={ setRefresh }
                                    />)}
                                </div>

                                {update && userIndex === idx && (
                                    <UserUpdate
                                        userData={ userData }
                                        setRefresh={ setRefresh }
                                        setUpdate={ setUpdate }
                                    />)}
                                <hr />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}