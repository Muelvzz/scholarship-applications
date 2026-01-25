import { createContext, useContext, useState, useEffect, useRef } from "react"
import api from "../services/api"

const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(undefined)
    const isLoadingRef = useRef(false)

    const loadUser = async() => {
        // Prevent concurrent requests
        if (isLoadingRef.current) return
        
        isLoadingRef.current = true
        const token = localStorage.getItem('access_token')
        
        try {
            if (!token) {
                setUser(null)
                return
            }

            const res = await api.get('/auth/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setUser(res.data)
        } catch (err) {
            console.error(err)
            setUser(null)
        } finally {
            isLoadingRef.current = false
        }
    }

    // Only run once on mount to check if user is already logged in
    useEffect(() => {
        loadUser()
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, loadUser }}>
            { children }
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
export default AuthContext