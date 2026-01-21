import { createContext, useContext, useState, useEffect } from "react"
import api from "../services/api"

const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(undefined)

    const loadUser = async() => {
        const token = localStorage.getItem('access_token')
        if (!token) {
            setUser(null)
            return
        }

        try {
            const res = await api.get('/auth/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setUser(res.data)
        } catch (err) {
            console.error(err)
            setUser(null)
        }
    }

        useEffect(() => {
            loadUser()
        }, [])

        return (
            <AuthContext.Provider value={{ user }}>
                { children }
            </AuthContext.Provider>
        )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
export default AuthContext