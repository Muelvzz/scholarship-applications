import AppRoutes from './Routes'
import Footer from '../components/Footer'
import './App.css'
import { AuthProvider } from '../context/AuthContext'

function App() {
  return (
    <>
      <AuthProvider>
        <AppRoutes />
        <Footer />
      </AuthProvider>
    </>
  )
}

export default App
