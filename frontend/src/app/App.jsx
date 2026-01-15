import AppRoutes from './Routes'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './App.css'
import { AuthProvider } from '../context/AuthContext'

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <AppRoutes />
        <Footer />
      </AuthProvider>
    </>
  )
}

export default App
