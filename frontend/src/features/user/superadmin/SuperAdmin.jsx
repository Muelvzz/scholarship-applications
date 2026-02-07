import { useState, useEffect } from "react"
import api from '../../../services/api.js'

import Dashboard from '../../scholarships/Dashboard.jsx'
import SuperAdminMain from "./components/SuperAdminMain.jsx"
import CreateScholarship from "../components/CreateScholarship.jsx"

import VerticalTab from '../components/VerticalTab.jsx'

export default function SuperAdmin() {

    const [userList, setUserList] = useState([])
    const [total, setTotal] = useState(0)

    const [width, setWidth] = useState(window.innerWidth)
    const [refresh, setRefresh] = useState(false)

    const [filter, setFilter] = useState('all')
    const [remove, setRemove] = useState(false)

    const [verticalTab, setVerticalTab] = useState([false, false, true, false])

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

            <div className="
                flex bg-[#393E41] min-h-screen 
                py-5 sm:pr-2 md:pr-6 lg:pr-10 
                sm:pl-3 md:pl-3 lg:pl-3
                gap-5 flex-col lg:flex-row
            ">
                <VerticalTab 
                    verticalTab={ verticalTab }
                    setVerticalTab={ setVerticalTab }
                />
                <div className="w-full text-white">
                    { verticalTab[0] && (
                        <CreateScholarship />
                    ) }
                    { verticalTab[1] && (
                        <Dashboard />
                    ) }

                    { verticalTab[2] && (
                        <SuperAdminMain
                            remove={ remove }
                            setRemove={ setRemove }
                            filter={ filter }
                            setFilter={ setFilter }
                            setRefresh={ setRefresh }
                            total={ total }
                            userList={ userList }
                        />
                    ) }

                    { verticalTab[3] && ('') }
                </div>
            </div>
        </>
    )
}