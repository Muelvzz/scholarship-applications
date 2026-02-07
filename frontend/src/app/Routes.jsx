import { Routes, Route } from 'react-router-dom'

import LandingPage from '../features/landing/LandingPage'
import Dashboard from '../features/scholarships/Dashboard'

import ProtectedRoute from '../features/auth/authorization/ProtectedRoute'
import AdminRoute from '../features/auth/authorization/AdminRoute'
import SuperAdminRoute from '../features/auth/authorization/SuperAdminRoute'
import MainNavBar from '../features/landing/components/MainNavBar'

import SuperAdmin from '../features/user/superadmin/SuperAdmin'
import Admin from '../features/user/admin/Admin'

export default function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={ <LandingPage /> }/>

            <Route
                path='/home'
                element={
                    <ProtectedRoute>
                        <MainNavBar/>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path='/admin'
                element={
                    <AdminRoute>
                        <MainNavBar/>
                        <Admin />
                    </AdminRoute>
                }
            />

            <Route
                path='/superadmin'
                element={
                    <SuperAdminRoute>
                        <MainNavBar/>
                        <SuperAdmin />
                    </SuperAdminRoute>
                }
            />
        </Routes>
    )
}