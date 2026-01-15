import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute ({ children }) {
    const { user } = useAuth();

    if (user === undefined) {
        return null
    }

    if (user === null) {
        return <Navigate to='/'/>
    }

    if (user.role !== 'superadmin') {
        return <Navigate to='/'/>
    }

    return children
}