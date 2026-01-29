import api from "../../services/api"
import { useState, useEffect } from "react"
import MainNavBar from '../landing/components/MainNavBar'

import ScholarshipTab from "./components/ScholarshipTab"
import ScholarshipCard from "./components/ScholarshipCard"
import ScholarshipInfo from "./components/ScholarshipInfo"

export default function Dashboard() {

    const [scholarships, setScholarships] = useState([])
    const [user, setUser] = useState(undefined)
    const [width, setWidth] = useState(window.innerWidth)
    
    const [scholarship, setScholarship] = useState(null)
    const [isSelected, setIsSelected] = useState(false)

    async function loadScholarships() {
        const token = localStorage.getItem('access_token')
        if (!token) {
            setUser(null)
            return
        }

        try {
            const res = await api.get('/scholarship/')

            setScholarships(res.data.data)
        } catch ( err ) {
            console.error(err)
            setUser(null)
        }
    }

    useEffect(() => {
        loadScholarships()
    }, [])

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
                <ScholarshipTab />

                <div className={!isSelected ? 'flex justify-between' : ''}>
                    {isSelected 
                        ? (<ScholarshipInfo 
                            scholarship={scholarship}
                            setIsSelected={setIsSelected}
                        />) 
                        : (<div>
                            <ScholarshipCard 
                                scholarships={scholarships}
                                setScholarship={setScholarship}
                                setIsSelected={setIsSelected}
                            />
                        </div>)}
                </div>

            </div>
        </>
    )
}