import api from "../../services/api"
import { useState, useEffect } from "react"
import ScholarshipModal from "./components/ScholarshipModal"
import { Link } from "react-router-dom"

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
            <div className="flex flex-col min-h-screen bg-gray-800 p-5 lg:grid lg:grid-cols-2 gap-4">
                <div className="lg:flex-1 lg:max-h-screen lg:overflow-y-auto lg:overflow-x-hidden overscroll-contain">
                    {
                        scholarships.map((sch, idx) => (
                            <button 
                                key={ idx } 
                                className="text-left mb-5 cursor-pointer transition-transform duration-400 hover:scale-101"
                                onClick={() => {setScholarship(sch), setIsSelected(true)}}
                            >
                                <div className="flex flex-col bg-gray-400 p-5 rounded-[1vw]">
                                    <div className="sm:flex justify-between font-bold items-center mb-5">
                                        <h1 className="text-xl">{ sch.title }</h1>
                                        <p>Deadline: { sch.deadline }</p>
                                    </div>
                                    <div>
                                        <h3 className="text-justify">{ sch.description }</h3>
                                    </div>
                                </div>
                            </button>
                        ))
                    }
                </div>
                <ScholarshipModal
                    width={ width }
                    scholarship={ scholarship} 
                    setIsSelected= {setIsSelected }
                    isSelected={ isSelected }
                />
            </div>
        </>
    )
}