import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function DoctorPortal() {
    const [page, setPage] = useState('profile');
    const [doctor, setDoctor] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const did = localStorage.getItem('referenceId');

    // ✅ fetchAllData OUTSIDE useEffect
    const fetchAllData = async () => {
        try {
            const doctorRes =
                await api.get(`/doctors/${did}`);
            setDoctor(doctorRes.data);

            const apptRes = await api.get(
                `/appointments/doctor/${did}`);
            setAppointments(apptRes.data);

            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    // ✅ useEffect just calls fetchAllData
    useEffect(() => {
        const loadData = async () => {
            if (!did) {
                navigate('/doctor-login');
                return;
            }
            await fetchAllData();
        };
        loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchPatientDetails = async (pid) => {
        try {
            const res =
                await api.get(`/patients/${pid}`);
            setSelectedPatient(res.data);
            setPage('caseStudy');
        } catch (err) {
            console.error(err);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    const today = new Date()
        .toISOString()
        .split('T')[0];

    const todayAppointments = appointments
        .filter(a => a.appointmentDate === today);

    // ✅ Unique patients this doctor has seen
    const myPatients = appointments.reduce(
        (acc, curr) => {
            if (!acc.find(a => a.pid === curr.pid)) {
                acc.push({
                    pid: curr.pid,
                    pname: curr.pname
                });
            }
            return acc;
        }, []);

    if (loading) return (
        <div style={styles.loading}>
            Loading doctor data...
        </div>
    );

    return (
        <div>
            {/* Navbar */}
            <div style={styles.navbar}>
                <span style={styles.navTitle}>
                    👨‍⚕️ Dr. {doctor?.dname}
                </span>
                <div style={styles.navLinks}>
                    {['profile', 'today',
                        'appointments',
                        'patients'].map(p => (
                        <button
                            key={p}
                            style={{
                                ...styles.navBtn,
                                backgroundColor:
                                    page === p
                                    ? 'rgba(255,255,255,0.3)'
                                    : 'transparent'
                            }}
                            onClick={() => setPage(p)}>
                            {p === 'profile' ?
                                'My Profile' :
                             p === 'today' ?
                                "Today's Schedule" :
                             p === 'patients' ?
                                'My Patients' :
                                'All Appointments'}
                        </button>
                    ))}
                    <button
                        style={styles.logoutBtn}
                        onClick={handleLogout}>
                        Logout →
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div style={styles.summaryContainer}>
                <div style={{
                    ...styles.summaryCard,
                    borderTop: '3px solid #3F51B5'
                }}>
                    <div style={styles.summaryNum}>
                        {todayAppointments.length}
                    </div>
                    <div style={styles.summaryLabel}>
                        Today's Appointments
                    </div>
                </div>
                <div style={{
                    ...styles.summaryCard,
                    borderTop: '3px solid #1D9E75'
                }}>
                    <div style={styles.summaryNum}>
                        {appointments.length}
                    </div>
                    <div style={styles.summaryLabel}>
                        Total Appointments
                    </div>
                </div>
                <div style={{
                    ...styles.summaryCard,
                    borderTop: '3px solid #E24B4A'
                }}>
                    <div style={styles.summaryNum}>
                        {myPatients.length}
                    </div>
                    <div style={styles.summaryLabel}>
                        Total Patients
                    </div>
                </div>
                <div style={{
                    ...styles.summaryCard,
                    borderTop: '3px solid #F57F17'
                }}>
                    <div style={{
                        ...styles.summaryNum,
                        fontSize: '16px'
                    }}>
                        {doctor?.specialization}
                    </div>
                    <div style={styles.summaryLabel}>
                        Specialization
                    </div>
                </div>
            </div>

            <div style={styles.content}>

                {/* Profile */}
                {page === 'profile' && doctor && (
                    <div style={styles.card}>
                        <h3 style={styles.cardTitle}>
                            👨‍⚕️ My Profile
                        </h3>
                        <div style={styles.grid}>
                            <InfoItem label="Doctor ID" value={`#${doctor.did}`}/>
                            <InfoItem label="Full Name" value={doctor.dname}/>
                            <InfoItem label="Specialization" value={doctor.specialization}/>
                            <InfoItem label="Qualification" value={doctor.qualification}/>
                            <InfoItem label="Experience" value={doctor.experience}/>
                            <InfoItem label="Consulting Fee" value={`₹${doctor.consultingFee}`}/>
                            <InfoItem label="Email" value={doctor.email}/>
                            <InfoItem label="Phone" value={doctor.phone}/>
                            <InfoItem label="Status" value={doctor.status} color="#1D9E75"/>
                        </div>
                    </div>
                )}

                {/* Today's Schedule */}
                {page === 'today' && (
                    <div style={styles.card}>
                        <h3 style={styles.cardTitle}>
                            📅 Today's Schedule — {today}
                        </h3>
                        {todayAppointments.length
                            === 0 ? (
                            <p style={styles.noData}>
                                No appointments today
                            </p>
                        ) : (
                            <table style={styles.table}>
                                <thead>
                                    <tr style={{
                                        backgroundColor:
                                        '#3F51B5',
                                        color: 'white'
                                    }}>
                                        <th style={styles.th}>
                                            Time
                                        </th>
                                        <th style={styles.th}>
                                            Patient
                                        </th>
                                        <th style={styles.th}>
                                            Reason
                                        </th>
                                        <th style={styles.th}>
                                            Status
                                        </th>
                                        <th style={styles.th}>
                                            Case Study
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {todayAppointments
                                        .map(a => (
                                        <tr key={a.aid}
                                            style={styles.tr}>
                                            <td style={styles.td}>
                                                {a.timeSlot}
                                            </td>
                                            <td style={styles.td}>
                                                {a.pname}
                                            </td>
                                            <td style={styles.td}>
                                                {a.reason}
                                            </td>
                                            <td style={styles.td}>
                                                <span style={{
                                                    padding: '3px 8px',
                                                    borderRadius: '20px',
                                                    fontSize: '11px',
                                                    fontWeight: '600',
                                                    backgroundColor:
                                                    a.status === 'BOOKED'
                                                    ? '#E1F5EA' : '#E8EAF6',
                                                    color:
                                                    a.status === 'BOOKED'
                                                    ? '#1D9E75' : '#3F51B5'
                                                }}>
                                                    {a.status}
                                                </span>
                                            </td>
                                            <td style={styles.td}>
                                                <button
                                                    style={styles.viewBtn}
                                                    onClick={() =>
                                                    fetchPatientDetails(
                                                        a.pid)}>
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}

                {/* All Appointments */}
                {page === 'appointments' && (
                    <div style={styles.card}>
                        <h3 style={styles.cardTitle}>
                            📋 All Appointments
                        </h3>
                        {appointments.length === 0 ? (
                            <p style={styles.noData}>
                                No appointments found
                            </p>
                        ) : (
                            <table style={styles.table}>
                                <thead>
                                    <tr style={{
                                        backgroundColor:
                                        '#3F51B5',
                                        color: 'white'
                                    }}>
                                        <th style={styles.th}>Date</th>
                                        <th style={styles.th}>Time</th>
                                        <th style={styles.th}>Patient</th>
                                        <th style={styles.th}>Reason</th>
                                        <th style={styles.th}>Status</th>
                                        <th style={styles.th}>Case Study</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments.map(a => (
                                        <tr key={a.aid}
                                            style={styles.tr}>
                                            <td style={styles.td}>
                                                {a.appointmentDate}
                                            </td>
                                            <td style={styles.td}>
                                                {a.timeSlot}
                                            </td>
                                            <td style={styles.td}>
                                                {a.pname}
                                            </td>
                                            <td style={styles.td}>
                                                {a.reason}
                                            </td>
                                            <td style={styles.td}>
                                                <span style={{
                                                    padding: '3px 8px',
                                                    borderRadius: '20px',
                                                    fontSize: '11px',
                                                    fontWeight: '600',
                                                    backgroundColor:
                                                    a.status === 'BOOKED'
                                                    ? '#E1F5EA' : '#E8EAF6',
                                                    color:
                                                    a.status === 'BOOKED'
                                                    ? '#1D9E75' : '#3F51B5'
                                                }}>
                                                    {a.status}
                                                </span>
                                            </td>
                                            <td style={styles.td}>
                                                <button
                                                    style={styles.viewBtn}
                                                    onClick={() =>
                                                    fetchPatientDetails(
                                                        a.pid)}>
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}

                {/* ✅ My Patients page */}
                {page === 'patients' && (
                    <div style={styles.card}>
                        <h3 style={styles.cardTitle}>
                            🏥 My Patients ({myPatients.length})
                        </h3>
                        {myPatients.length === 0 ? (
                            <p style={styles.noData}>
                                No patients yet
                            </p>
                        ) : (
                            <div style={styles.grid}>
                                {myPatients.map(p => (
                                    <div
                                        key={p.pid}
                                        style={styles.patientCard}
                                        onClick={() =>
                                        fetchPatientDetails(
                                            p.pid)}>
                                        <div style={styles.patientIcon}>
                                            👤
                                        </div>
                                        <div style={styles.patientName}>
                                            {p.pname}
                                        </div>
                                        <div style={styles.patientId}>
                                            ID: #{p.pid}
                                        </div>
                                        <button
                                            style={styles.viewBtn}>
                                            View Case Study
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Patient Case Study */}
                {page === 'caseStudy' &&
                    selectedPatient && (
                    <div style={styles.card}>
                        <button
                            style={styles.backBtn}
                            onClick={() =>
                                setPage('appointments')}>
                            ← Back to Appointments
                        </button>
                        <h3 style={styles.cardTitle}>
                            🏥 Patient Case Study
                        </h3>
                        <div style={styles.grid}>
                            <InfoItem label="Patient ID" value={`#${selectedPatient.pid}`}/>
                            <InfoItem label="Patient Name" value={selectedPatient.pname}/>
                            <InfoItem label="Age" value={`${selectedPatient.age} years`}/>
                            <InfoItem label="Gender" value={selectedPatient.gender}/>
                            <InfoItem label="Blood Group" value={selectedPatient.bloodGroup} color="#E24B4A"/>
                            <InfoItem label="Disease" value={selectedPatient.disease} color="#E24B4A"/>
                            <InfoItem label="Admission Date" value={selectedPatient.admissionDate}/>
                            <InfoItem label="Status" value={selectedPatient.status} color="#1D9E75"/>
                            <InfoItem label="Phone" value={selectedPatient.pno}/>
                            <InfoItem label="Email" value={selectedPatient.email}/>
                            <InfoItem label="Address" value={selectedPatient.address}/>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function InfoItem({ label, value, color }) {
    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
            <span style={{fontSize: '11px', color: '#999', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600'}}>
                {label}
            </span>
            <span style={{fontSize: '14px', color: color || '#2C3E50', fontWeight: '500'}}>
                {value || 'N/A'}
            </span>
        </div>
    );
}

const styles = {
    navbar: {
        backgroundColor: '#3F51B5',
        padding: '12px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
    },
    navTitle: {
        color: 'white',
        fontSize: '18px',
        fontWeight: '700'
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
        fontWeight: '500'
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
    summaryContainer: {
        display: 'flex',
        gap: '20px',
        padding: '20px 24px',
        backgroundColor: '#E8EAF6',
        flexWrap: 'wrap'
    },
    summaryCard: {
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '16px 24px',
        flex: 1,
        minWidth: '150px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        textAlign: 'center'
    },
    summaryNum: {
        fontSize: '24px',
        fontWeight: '700',
        color: '#2C3E50',
        marginBottom: '4px'
    },
    summaryLabel: {
        fontSize: '12px',
        color: '#999'
    },
    content: {
        padding: '20px 24px',
        backgroundColor: '#E8EAF6',
        minHeight: '60vh'
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '20px 24px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
    },
    cardTitle: {
        fontSize: '18px',
        fontWeight: '600',
        color: '#2C3E50',
        marginBottom: '20px',
        paddingBottom: '10px',
        borderBottom: '2px solid #E8EAF6'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns:
            'repeat(auto-fill, minmax(180px, 1fr))',
        gap: '20px'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse'
    },
    th: {
        padding: '10px 12px',
        textAlign: 'left',
        fontSize: '13px'
    },
    tr: {
        borderBottom: '1px solid #f0f0f0'
    },
    td: {
        padding: '10px 12px',
        fontSize: '13px',
        color: '#333'
    },
    viewBtn: {
        backgroundColor: '#3F51B5',
        color: 'white',
        border: 'none',
        padding: '4px 12px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '12px'
    },
    backBtn: {
        backgroundColor: 'transparent',
        border: '1px solid #3F51B5',
        color: '#3F51B5',
        padding: '6px 14px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '13px',
        marginBottom: '15px'
    },
    // ✅ Patient cards in My Patients page
    patientCard: {
        backgroundColor: '#F8F9FA',
        borderRadius: '10px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        border: '1px solid #E8EAF6',
        transition: 'all 0.2s'
    },
    patientIcon: {
        fontSize: '30px',
        width: '60px',
        height: '60px',
        backgroundColor: '#E8EAF6',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    patientName: {
        fontSize: '15px',
        fontWeight: '600',
        color: '#2C3E50'
    },
    patientId: {
        fontSize: '12px',
        color: '#999'
    },
    noData: {
        textAlign: 'center',
        color: '#999',
        padding: '40px',
        fontSize: '16px'
    },
    loading: {
        textAlign: 'center',
        padding: '60px',
        fontSize: '16px',
        color: '#3F51B5'
    }
};

export default DoctorPortal;

