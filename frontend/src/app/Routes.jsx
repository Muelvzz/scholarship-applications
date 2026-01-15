import { Routes, Route } from 'react-router-dom'

import LandingPage from '../features/LandingPage'
import Login from '../features/auth/Login'
import Register from '../features/auth/Register'
import Dashboard from '../features/scholarships/pages/Dashboard'

import ProtectedRoute from '../components/ProtectedRoute'
import AdminRoute from '../components/AdminRoute'

import SuperAdmin from '../features/admin/SuperAdmin'

export default function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={ <LandingPage /> }/>
            <Route path='/login' element={ <Login /> }/>
            <Route path='/register' element={ <Register /> }/>

            <Route
                path='/home'
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path='/superadmin'
                element={
                    <AdminRoute>
                        <SuperAdmin />
                    </AdminRoute>
                }
            />
        </Routes>
    )
}