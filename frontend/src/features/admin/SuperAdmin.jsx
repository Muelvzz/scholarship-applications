import { useState, useEffect } from "react"
import AdminUse from "./components/AdminUse"
import UserList from "./components/UserList"
import api from '../../services/api.js'
import Dashboard from '../scholarships/Dashboard.jsx'

export default function SuperAdmin() {

    const [userList, setUserList] = useState([])
    const [width, setWidth] = useState(window.innerWidth)
    const [refresh, setRefresh] = useState(false)
    const [isAdmin, setIsAdmin] = useState(true)

    async function loadUserList() {
        const token = localStorage.getItem('access_token')

        try {
            const res = await api.get('/admin/')

            setUserList(res.data.data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        loadUserList()
    }, [refresh])

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth)

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const showAdminUse = width >= 1032

    return (
        <>
            <div className="
                min-h-screen flex flex-col
                bg-gray-800 p-5
                justify-start items-center
            ">
                <div><button onClick={() => setIsAdmin(!isAdmin)}>{ isAdmin ? 'Show Scholarships' : 'Show Users' }</button></div>

                {isAdmin ? (
                    <div
                        className="flex flex-col gap-y-3 lg:w-3/5"
                    >
                        {userList.flatMap((user, idx) => (
                            user.role !== 'superadmin' ?  <UserList 
                                user={ user }
                                idx={ idx }
                                setRefresh={ setRefresh }
                                refresh={ refresh }
                            /> : ''
                        ))}
                    </div>
                ) : <Dashboard />}

            </div>
        </>
    )
}

// Suggested Feature:
// Add layout options