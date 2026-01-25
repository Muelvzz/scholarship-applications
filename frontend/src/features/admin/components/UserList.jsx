import { useState, useEffect } from 'react'
import EditUser from '../components/EditUser'

export default function UserList({ user, idx, setRefresh, refresh }) {

    const [userData, setUserData] = useState({})

    const [isEdit, setisEdit] = useState(false)
    const [isDelete, setIsDelete] = useState(false)

    const userRoleColor = (role) => {
        if (role === 'user') return 'bg-green-400'
        if (role === 'admin') return 'bg-amber-400'     
        return 'bg-red-500'
    }

    const imageStyle = `w-12 p-1.5 rounded-[0.75vw] cursor-pointer`
    const hoverScale = `transition-transform duration-400 hover:scale-102`

    return (
        <>
            <div
                key={ idx }
                className={`
                    bg-white p-5 rounded-[1vw] ${ hoverScale } flex items-center justify-between
                `}
            >
                <div className="flex gap-x-3">
                    <div>
                        <img 
                            src="\profile.png" 
                            alt="Profile Icon" 
                            className={`
                                w-16 p-1.5 rounded-[0.75vw] ${ userRoleColor(user.role) }
                            `}
                        />
                    </div>
                    <div>
                        <h1
                            className="text-lg font-semibold"
                        > { `${user.last_name}, ${ user.first_name }` }</h1>
                        <div>
                            <h1><u>{ user.email }</u></h1>
                        </div>
                    </div>
                </div>
                <div className="flex gap-x-3">
                    <button className={`${ hoverScale }`}>
                        <img 
                            src="\delete.png" 
                            alt="Delete Icon" 
                            className={`
                                ${ imageStyle } ${ userRoleColor(user.role) } hover:bg-red-500
                            `}
                        />
                    </button>
                    <button className={`${ hoverScale }`}>
                        <img 
                            src="\edit.png" 
                            alt="Edit Icon" 
                            className={`
                                ${ imageStyle } ${ userRoleColor(user.role) } hover:bg-red-500
                            `}
                            onClick={() => setisEdit(true)}
                        />
                    </button>
                </div>
            </div>

            { isEdit && (<EditUser
                isEdit={ isEdit }
                setisEdit={ setisEdit }
                user={ user }
                refresh={ refresh }
                setRefresh={ setRefresh }
            />) }
        </>
    )
}