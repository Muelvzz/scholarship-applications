import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function ProtectedRoute ({ children }) {
    const { user } = useAuth()

    // Show loading state while checking authentication
    if (user === undefined) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>
    }

    // Redirect to login if not authenticated
    if (user === null) {
        return <Navigate to='/login' replace/>
    }

    return children
}