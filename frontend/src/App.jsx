import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PatientLoginPage from './pages/PatientLoginPage';
import DoctorLoginPage from './pages/DoctorLoginPage';
import AdminLoginPage from './pages/AdminLoginPage';
import PatientPortal from './pages/PatientPortal';
import DoctorPortal from './pages/DoctorPortal';
import AdminPortal from './pages/AdminPortal';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Home */}
                <Route path="/" element={<HomePage />} />

                {/* Login pages */}
                <Route path="/patient-login" element={<PatientLoginPage />}/>
                <Route path="/doctor-login" element={<DoctorLoginPage />}/>
                <Route path="/admin-login" element={<AdminLoginPage />}/>

                {/* Portals after login */}
                <Route path="/patient-portal" element={<PatientPortal />}/>
                <Route path="/doctor-portal" element={<DoctorPortal />}/>
                <Route path="/admin-portal" element={<AdminPortal />}/>

                {/* Default redirect */}
                <Route path="*" element={<Navigate to="/" />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;