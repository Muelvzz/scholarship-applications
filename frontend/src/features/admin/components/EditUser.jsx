import { useState } from "react"
import api from "../../../services/api"

export default function EditUser({ isEdit, setisEdit, user, refresh, setRefresh }) {

    const [email, setEmail] = useState(user.email)
    const [firstName, setFirstName] = useState(user.first_name)
    const [lastName, setLastName] = useState(user.last_name)
    const [role, setRole] = useState(user.role)

    const handleEmail = (e) => { setEmail(e.target.value) }
    const handleFirstName = (e) => { setFirstName(e.target.value) }
    const handleLastname = (e) => { setLastName(e.target.value) }
    const handleRole = (e) => { setRole(e.target.value) }

    async function updateUser(id, userData) {
        const res = await api.put(`/admin/${ id }`, userData)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const userData = {
            email: email,
            first_name: firstName,
            last_name: lastName,
            role: role || 'user'
        }

        try {
            await api.put(`/admin/${ user.id }`, userData)
            setisEdit(false)
            setRefresh(() => !refresh)
        } catch (err) {
            console.error(err.response?.data || err.message)
        }

        updateUser(user.id, userData)
    }

    return (
        <div 
            className={`
                fixed inset-0 z-40
                bg-black/40 backdrop-blur-sm transition-opacity duration-200
                ${ isEdit ? 'opacity-100' : 'opacity-0 pointer-events-none' }
                `}
        >
            <div
                className={`fixed inset-0 z-50 flex items-center justify-center`}
            >
                <div
                    className={`
                        shadow-2xl p-6 bg-white rounded-[1vw] w-4/5
                        transform transition-all duration-200 ease-out
                        ${ isEdit ? 'opacity-100' : 'opacity-0 scale-95' }
                        `}
                >
                    <form
                        className="flex flex-col gap-y-3 px-5"
                        method="post" onSubmit={ handleSubmit }
                    >
                        <div className="flex justify-between gap-x-3">
                            <input 
                                type="email"
                                placeholder="Email"
                                className="w-full bg-gray-500 p-1 rounded-[0.75vw]"
                                value={ email } onChange={ handleEmail } required
                            />
                            <select 
                                className="px-5 font-semibold bg-gray-500 rounded-[0.75vw]"
                                value={ role } onChange={ handleRole } required
                            >
                                <option value="">-- Role --</option>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <hr />
                        <div className="flex justify-between gap-x-3">
                            <input 
                                type="text"
                                placeholder="First Name"
                                className="w-full bg-gray-500 p-1 rounded-[0.75vw]"
                                value={ firstName } onChange={ handleFirstName } required 
                            />
                            <input 
                                type="text"
                                placeholder="Last Name"
                                className="w-full bg-gray-500 p-1 rounded-[0.75vw]"
                                value={ lastName } onChange={ handleLastname } required 
                            />
                        </div>

                        <div
                            className="flex justify-center gap-x-6 font-bold"
                        >
                            <button
                                className="
                                    bg-green-400 py-1 px-5 rounded-[0.75vw] cursor-pointer
                                    transition-transform duration-400 hover:scale-103
                                    "
                                onClick={() => setisEdit(false)}
                            >Cancel</button>

                            <button
                                className="
                                    bg-amber-400 py-1 px-5 rounded-[0.75vw] cursor-pointer
                                    transition-transform duration-400 hover:scale-103
                                    "
                            >Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}