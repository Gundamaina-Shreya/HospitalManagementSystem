import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function HomePage() {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);

    const fetchDoctors = async () => {
        try {
            const response =
                await api.get('/doctors');
            // Show only first 6 doctors
            setDoctors(response.data.slice(0, 6));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            await fetchDoctors();
        };
        loadData();
    }, []);

    return (
        <div style={styles.container}>

            {/* Header */}
            <div style={styles.header}>
                <h1 style={styles.headerTitle}>
                    🏥 Hospital Management System
                </h1>
                <p style={styles.headerSub}>
                    Complete Digital Healthcare Solution
                </p>
            </div>

            {/* Login Cards */}
            <div style={styles.cardsContainer}>
                {/* Patient Login */}
                <div style={styles.card}
                    onClick={() =>
                        navigate('/patient-login')}>
                    <div style={{
                        ...styles.cardIcon,
                        backgroundColor: '#E1F5EA'
                    }}>👤</div>
                    <h2 style={styles.cardTitle}>
                        Patient Portal
                    </h2>
                    <p style={styles.cardDesc}>
                        View appointments, bills,
                        reports and next visit date
                    </p>
                    <button style={{
                        ...styles.cardBtn,
                        backgroundColor: '#1D9E75'
                    }}>
                        Patient Login →
                    </button>
                </div>

                {/* Doctor Login */}
                <div style={styles.card}
                    onClick={() =>
                        navigate('/doctor-login')}>
                    <div style={{
                        ...styles.cardIcon,
                        backgroundColor: '#E8EAF6'
                    }}>👨‍⚕️</div>
                    <h2 style={styles.cardTitle}>
                        Doctor Portal
                    </h2>
                    <p style={styles.cardDesc}>
                        View daily appointments,
                        patient schedules and profile
                    </p>
                    <button style={{
                        ...styles.cardBtn,
                        backgroundColor: '#3F51B5'
                    }}>
                        Doctor Login →
                    </button>
                </div>

                {/* Admin Login */}
                <div style={styles.card}
                    onClick={() =>
                        navigate('/admin-login')}>
                    <div style={{
                        ...styles.cardIcon,
                        backgroundColor: '#FFF8E1'
                    }}>👑</div>
                    <h2 style={styles.cardTitle}>
                        Admin Portal
                    </h2>
                    <p style={styles.cardDesc}>
                        Manage patients, doctors,
                        appointments and billing
                    </p>
                    <button style={{
                        ...styles.cardBtn,
                        backgroundColor: '#F57F17'
                    }}>
                        Admin Login →
                    </button>
                </div>
            </div>

            {/* ✅ Our Doctors Section */}
            {doctors.length > 0 && (
                <div style={styles.doctorsSection}>
                    <h2 style={styles.sectionTitle}>
                        👨‍⚕️ Our Doctors
                    </h2>
                    <p style={styles.sectionSub}>
                        Expert medical professionals
                        ready to help you
                    </p>
                    <div style={styles.doctorsGrid}>
                        {doctors.map(doctor => (
                            <div
                                key={doctor.did}
                                style={styles.doctorCard}>
                                <div style={
                                    styles.doctorIcon}>
                                    👨‍⚕️
                                </div>
                                <h3 style={
                                    styles.doctorName}>
                                    {doctor.dname}
                                </h3>
                                <p style={
                                    styles.doctorSpec}>
                                    {doctor.specialization}
                                </p>
                                <p style={
                                    styles.doctorQual}>
                                    {doctor.qualification}
                                </p>
                                <p style={
                                    styles.doctorExp}>
                                    Experience: {doctor.experience}
                                </p>
                                <div style={{
                                    ...styles.doctorFee,
                                }}>
                                    Consultation: ₹{doctor.consultingFee}
                                </div>
                                <div style={{
                                    ...styles.doctorStatus,
                                    backgroundColor:
                                        doctor.status ===
                                        'AVAILABLE'
                                        ? '#E1F5EA'
                                        : '#FDEDEC',
                                    color:
                                        doctor.status ===
                                        'AVAILABLE'
                                        ? '#1D9E75'
                                        : '#E24B4A'
                                }}>
                                    {doctor.status ===
                                    'AVAILABLE'
                                        ? '✅ Available'
                                        : '❌ Not Available'}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Footer */}
            <div style={styles.footer}>
                <p>© 2026 Hospital Management System
                    — Built with Spring Boot + React
                </p>
            </div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#EBF5FB',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    header: {
        width: '100%',
        backgroundColor: '#1890ff',
        padding: '40px 20px',
        textAlign: 'center',
        color: 'white'
    },
    headerTitle: {
        fontSize: '32px',
        fontWeight: '700',
        margin: '0 0 10px 0'
    },
    headerSub: {
        fontSize: '16px',
        opacity: '0.9',
        margin: 0
    },
    cardsContainer: {
        display: 'flex',
        gap: '30px',
        padding: '50px 20px 20px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: '1100px'
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '15px',
        padding: '30px',
        width: '280px',
        textAlign: 'center',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px'
    },
    cardIcon: {
        width: '70px',
        height: '70px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '30px'
    },
    cardTitle: {
        fontSize: '20px',
        fontWeight: '600',
        color: '#2C3E50',
        margin: 0
    },
    cardDesc: {
        fontSize: '13px',
        color: '#7F8C8D',
        lineHeight: '1.6',
        margin: 0
    },
    cardBtn: {
        color: 'white',
        border: 'none',
        padding: '10px 25px',
        borderRadius: '25px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        width: '100%'
    },
    // ✅ Doctors section styles
    doctorsSection: {
        width: '100%',
        maxWidth: '1100px',
        padding: '20px 20px 40px',
        textAlign: 'center'
    },
    sectionTitle: {
        fontSize: '28px',
        fontWeight: '700',
        color: '#2C3E50',
        marginBottom: '8px'
    },
    sectionSub: {
        fontSize: '14px',
        color: '#7F8C8D',
        marginBottom: '30px'
    },
    doctorsGrid: {
        display: 'grid',
        gridTemplateColumns:
            'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px'
    },
    doctorCard: {
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        borderTop: '3px solid #3F51B5'
    },
    doctorIcon: {
        fontSize: '40px',
        width: '70px',
        height: '70px',
        backgroundColor: '#E8EAF6',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    doctorName: {
        fontSize: '16px',
        fontWeight: '700',
        color: '#2C3E50',
        margin: 0
    },
    doctorSpec: {
        fontSize: '13px',
        color: '#3F51B5',
        fontWeight: '600',
        margin: 0
    },
    doctorQual: {
        fontSize: '12px',
        color: '#7F8C8D',
        margin: 0
    },
    doctorExp: {
        fontSize: '12px',
        color: '#7F8C8D',
        margin: 0
    },
    doctorFee: {
        fontSize: '13px',
        fontWeight: '600',
        color: '#1890ff',
        backgroundColor: '#E6F1FB',
        padding: '4px 12px',
        borderRadius: '20px'
    },
    doctorStatus: {
        fontSize: '12px',
        fontWeight: '600',
        padding: '4px 12px',
        borderRadius: '20px'
    },
    footer: {
        marginTop: 'auto',
        padding: '20px',
        color: '#999',
        fontSize: '12px'
    }
};

export default HomePage;