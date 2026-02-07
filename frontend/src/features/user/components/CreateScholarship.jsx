import { useState } from "react"
import TitleDate from "./TitleDate"
import Description from "./Description"
import ReqsAndElig from "./ReqsAndElig"
import BenAndProgAndSchool from "./BenAndProgAndSchool"
import Link from "./Link"
import api from '../../../services/api'

export default function CreateScholarship() {

    const [title, setTitle] = useState('')
    const [deadline, setDeadline] = useState('')
    const [description, setDescription] = useState('')
    const [documents, setDocuments] = useState([])
    const [eligibility, setEligibility] = useState([])
    const [benefits, setBenefits] = useState([])
    const [programs, setPrograms] = useState([])
    const [schools, setSchools] = useState([])
    const [link, setLink] = useState('')

    const [documentSize, setDocumentSize] = useState(0)
    const [eligibilitySize, setEligibilitySize] = useState(0)
    const [benefitsSize, setBenefitsSize] = useState(0)
    const [programSize, setProgramSize] = useState(0)
    const [schoolSize, setSchoolSize] = useState(0)

    const handleTitle = (e) => {setTitle(e.target.value)}
    const handleDescription = (e) => {setDescription(e.target.value)}
    const handleDeadline = (e) => {setDeadline(e.target.value)}

    const handleDocuments = (index, value) => {
        setDocuments((prev) => {
            const updated = [...prev]
            updated[index] = value
            return updated
        })
    }
    
    const handleEligibility = (index, value) => {
        setEligibility((prev) => {
            const updated = [...prev]
            updated[index] = value
            return updated
        })
    }

    const handleBenefits = (index, value) => {
        setBenefits((prev) => {
            const updated = [...prev]
            updated[index] = value
            return updated
        })
    }

    const handlePrograms = (index, value) => {
        setPrograms((prev) => {
            const updated = [...prev]
            updated[index] = value
            return updated
        })
    }

    const handleSchool = (index, value) => {
        setSchools((prev) => {
            const updated = [...prev]
            updated[index] = value
            return updated
        })
    }
    const handleLink = (e) => {setLink(e.target.value)}

    const handleDocumentSize = (e) => {
        const value = Number(e.target.value)
        setDocumentSize(value)

        setDocuments((prev) => {
            const updated = [...prev]

            if (value === updated.length) {
                return updated.concat(Array(value - updated.length).fill(''))
            } else {
                return updated.slice(0, value)
            }
        })
    }

    const handleEligibilitySize = (e) => {
        const value = Number(e.target.value)
        setEligibilitySize(value)

        setEligibility((prev) => {
            const updated = [...prev]

            if (value === updated.length) {
                return updated.concat(Array(value - updated.length).fill(''))
            } else {
                return updated.slice(0, value)
            }
        })
    }

    const handleBenefitsSize = (e) => {
        const value = Number(e.target.value)
        setBenefitsSize(value)

        setBenefits((prev) => {
            const updated = [...prev]

            if (value === updated.length) {
                return updated.concat(Array(value - updated.length).fill(''))
            } else {
                return updated.slice(0, value)
            }
        })
    }

    const handleProgramSize = (e) => {
        const value = Number(e.target.value)
        setProgramSize(value)

        setPrograms((prev) => {
            const updated = [...prev]

            if (value === updated.length) {
                return updated.concat(Array(value - updated.length).fill(''))
            } else {
                return updated.slice(0, value)
            }
        })
    }
    
    const handleSchoolSize = (e) => {
        const value = Number(e.target.value)
        setSchoolSize(value)

        setSchools((prev) => {
            const updated = [...prev]

            if (value === updated.length) {
                return updated.concat(Array(value - updated.length).fill(''))
            } else {
                return updated.slice(0, value)
            }
        })
    }

    const handleSubmit = async () => {
        event.preventDefault()

        try {
            const data = {
                title: title,
                description: description,
                link: link,
                deadline: deadline,
                documentary_requirements: documents,
                eligibility_requirements: eligibility,
                benefits: benefits,
                priority_programs: programs,
                priority_schools: schools,
            }

            await api.post('/scholarship/', data)

            setTitle('')
            setDeadline('')
            setDescription('')
            setDocuments([])
            setEligibility([])
            setBenefits([])
            setPrograms([])
            setSchools([])
            setLink('')

            setDocumentSize(0)
            setEligibilitySize(0)
            setBenefitsSize(0)
            setProgramSize(0)
            setSchoolSize(0)
        } catch (err) {
            if (err.response?.status === 400) {
                console.error(err.response.data.detail)
            }
        }
    }

    const formStyle = 'border-solid border-2 border-white rounded-lg px-3 py-1'
    const paragraphStyle = 'text-lg sm:text-xl font-bold'

    return (
        <>
            <div>
                <div>
                    <p className="text-2xl lg:text-3xl font-bold">Create Scholarship</p>
                    <hr />
                </div>
                <div className="mt-5">
                    <form className="flex flex-col w-full gap-y-3" onSubmit={ handleSubmit }>
                        <TitleDate 
                            formStyle={ formStyle }
                            title={ title }
                            handleTitle={ handleTitle }
                            deadline={ deadline }
                            handleDeadline={ handleDeadline }
                        />
                        <Description 
                            formStyle={ formStyle }
                            description={ description }
                            handleDescription={ handleDescription }
                        />

                        <hr />
                        <ReqsAndElig 
                            paragraphStyle={ paragraphStyle }
                            formStyle={ formStyle }
                            documentSize={ documentSize }
                            handleDocumentSize={ handleDocumentSize }
                            handleDocuments={ handleDocuments }
                            eligibilitySize={ eligibilitySize }
                            handleEligibilitySize={ handleEligibilitySize }
                            handleEligibility={ handleEligibility }
                        />
                        <BenAndProgAndSchool 
                            paragraphStyle={ paragraphStyle }
                            formStyle={ formStyle }
                            benefitsSize={ benefitsSize }
                            handleBenefitsSize={ handleBenefitsSize }
                            handleBenefits={ handleBenefits }
                            programSize={ programSize }
                            handleProgramSize={ handleProgramSize }
                            handlePrograms={ handlePrograms }
                            schoolSize={ schoolSize }
                            handleSchoolSize={ handleSchoolSize }
                            handleSchool={ handleSchool }
                        />

                        <Link 
                            formStyle={ formStyle }
                            link={ link }
                            handleLink={ handleLink }
                        />
                        <button className="
                            bg-[#e94f37] font-bold py-3
                            rounded-lg cursor-pointer
                        ">Create Scholarship</button>
                    </form>
                </div>
            </div>
        </>
    )
}