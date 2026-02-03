import { useState } from "react"
import api from "../../../services/api"

export default function UserUpdate({ userData, setRefresh, setUpdate }) {

    const [firstName, setFirstName] = useState(userData.first_name)
    const [lastName, setLastName] = useState(userData.last_name)
    const [email, setEmail] = useState(userData.email)
    const [role, setRole] = useState(userData.role)

    const handleFirstName = (e) => {setFirstName(e.target.value)}
    const handleLastName = (e) => {setLastName(e.target.value)}
    const handleEmail = (e) => {setEmail(e.target.value)}
    const handleRole = (e) => {setRole(e.target.value)}

    const inputStyles = 'flex-1 bg-white rounded-lg py-0.5 px-2 text-black w-full'

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newUserData = {
            email: email,
            first_name: firstName,
            last_name: lastName,
            role: role,
        }

        try {
            await api.put(`/admin/${ userData.id }`, newUserData)
            setRefresh(prev => !prev)
            setUpdate(false)
        } catch (err) {
            console.error(err.response?.data || err.message)
        }
    }

    return (
        <>
            <div className="px-3 mb-2 flex flex-col items-center">
                <form 
                    method="post" onSubmit={ handleSubmit }
                    className="
                        gap-3 items-center w-full"
                >
                    <div className="
                        flex flex-col sm:grid sm:grid-cols-2 gap-3
                    ">
                        <input 
                            type="text" 
                            className={ inputStyles }
                            placeholder="First Name"
                            onChange={ handleFirstName } value={ firstName } required
                        />
                        <input 
                            type="text" 
                            className={ inputStyles }
                            placeholder="Last Name"
                            onChange={ handleLastName } value={ lastName } required
                        />

                        <input 
                            type="text" 
                            className={ inputStyles }
                            placeholder="Email"
                            onChange={ handleEmail } value={ email } required
                        />
                        <select 
                            type="text" 
                            className={ inputStyles }
                            placeholder="Role"
                            onChange={ handleRole } value={ role } required
                        >
                            <option value="">-- Role --</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <div className="mt-2 text-center">
                        <button
                            className="
                                bg-white rounded-lg 
                                py-0.5 px-10 text-black 
                                font-semibold cursor-pointer"
                        >Update</button>
                    </div>
                </form>
            </div>
        </>
    )
}