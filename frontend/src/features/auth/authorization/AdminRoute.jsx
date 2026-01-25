import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function AdminRoute ({ children }) {
    const { user } = useAuth();

    // Show loading state while checking authentication
    if (user === undefined) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>
    }

    // Redirect if not authenticated
    if (user === null) {
        return <Navigate to='/' replace/>
    }

    // Redirect if not admin
    if (user.role !== 'superadmin') {
        return <Navigate to='/' replace/>
    }

    return children
}