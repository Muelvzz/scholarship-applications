import { useState, useEffect } from "react"
import api from '../../services/api.js'

import MainNavBar from '../landing/components/MainNavBar.jsx'
import UserTab from './components/UserTab.jsx'
import UserFilter from "./components/UserFilter.jsx"
import UserCard from "./components/UserCard.jsx"

export default function SuperAdmin() {

    const [userList, setUserList] = useState([])
    const [total, setTotal] = useState(0)

    const [width, setWidth] = useState(window.innerWidth)
    const [refresh, setRefresh] = useState(false)

    const [filter, setFilter] = useState('all')

    const getFilteredUser = async (filter) => {
        const res = await api.get(`/admin/${ filter }`)

        setTotal(res.data.total)
        setUserList(res.data.data)
    }

    async function loadUserList() {
        const token = localStorage.getItem('access_token')

        try {
            if (filter !== 'all') {
                getFilteredUser(filter)
            } else {
                const res = await api.get('/admin/')

                setTotal(res.data.total)
                setUserList(res.data.data)
            }
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

    return (
        <>
            <MainNavBar />

            <div className="
                bg-[#393E41] min-h-screen
                py-5 px-10 text-white"
            >
                <UserTab 
                />
                <UserFilter
                    filter={ filter }
                    setFilter={ setFilter }
                    setRefresh={ setRefresh }
                    total={ total }
                />
                <UserCard 
                    userList={ userList }
                />
            </div>
        </>
    )
}