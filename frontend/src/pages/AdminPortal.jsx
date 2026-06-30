import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PatientList from '../components/patientList';
import AddPatient from "../components/addPatient";
import AddBill from "../components/AddBill";

function AdminPortal() {
    const [page, setPage] = useState('patients');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <div>
            <div style={styles.navbar}>
                <span style={styles.navTitle}>
                    💻 Admin Portal
                </span>
                <div style={styles.navLinks}>
                    <button
                        style={{
                            ...styles.navBtn,
                            backgroundColor:
                                page === 'patients'
                                ? 'rgba(255,255,255,0.3)'
                                : 'transparent'
                        }}
                        onClick={() =>
                            setPage('patients')}>
                        🛌 Patients
                    </button>
                    <button
                        style={{
                            ...styles.navBtn,
                            backgroundColor:
                                page === 'addPatient'
                                ? 'rgba(255,255,255,0.3)'
                                : 'transparent'
                        }}
                        onClick={() =>
                            setPage('addPatient')}>
                        ➕ Add Patient
                    </button>
                    <button
                        style={{
                            ...styles.navBtn,
                            backgroundColor:
                                page === 'doctors'
                                ? 'rgba(255,255,255,0.3)'
                                : 'transparent'
                        }}
                        onClick={() =>
                            setPage('doctors')}>
                        👨‍⚕️ Doctors
                    </button>

                    {/* ✅ Add Bill button */}
                    <button
                        style={{
                            ...styles.navBtn,
                            backgroundColor:
                                page === 'addBill'
                                ? 'rgba(255,255,255,0.3)'
                                : 'transparent'
                        }}
                        onClick={() =>
                            setPage('addBill')}>
                        💰 Create Bill
                    </button>

                    <button
                        style={styles.logoutBtn}
                        onClick={handleLogout}>
                        Logout ➡️
                    </button>
                </div>
            </div>

            {/* Pages */}
            {page === 'patients' && <PatientList />}
            {page === 'addPatient' && <AddPatient />}
            {page === 'addBill' && <AddBill />}
            {page === 'doctors' && (
                <div style={styles.comingSoon}>
                    <h2>👨‍⚕️ Doctor Management</h2>
                    <p>Coming Soon...</p>
                </div>
            )}
        </div>
    );
}

const styles = {
    navbar: {
        backgroundColor: '#F57F17',
        padding: '12px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
    },
    navTitle: {
        color: 'white',
        fontSize: '18px',
        fontWeight: '700',
        letterSpacing: '0.5px'
    },
    navLinks: {
        display: 'flex',
        gap: '8px',
        alignItems: 'center'
    },
    navBtn: {
        color: 'white',
        border: '1px solid rgba(255,255,255,0.5)',
        padding: '7px 16px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: '500',
        transition: 'all 0.2s'
    },
    logoutBtn: {
        backgroundColor: '#c0392b',
        color: 'white',
        border: 'none',
        padding: '7px 16px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: '600',
        marginLeft: '8px'
    },
    comingSoon: {
        textAlign: 'center',
        padding: '60px',
        color: '#999'
    }
};

export default AdminPortal;