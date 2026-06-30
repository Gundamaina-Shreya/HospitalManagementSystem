import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function PatientPortal() {
    const [page, setPage] = useState('profile');
    const [patient, setPatient] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Get referenceID from localStorage
    const pid = localStorage.getItem('referenceId');

    const fetchAllData = async () => {
        try {
            // Fetch patient profile
            const patientRes =
                await api.get(`/patients/${pid}`);
            setPatient(patientRes.data);

            // Fetch appointments
            const apptRes = await api.get(
                `/appointments/patient/${pid}`);
            setAppointments(apptRes.data);

            // Fetch bills
            const billRes = await api.get(
                `/bills/patients/${pid}`);
            setBills(billRes.data);

            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            if (!pid) {
                navigate('/patient-login');
                return;
            }
            await fetchAllData();
        };
        loadData();
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    // Get next appointment
    const nextAppointment = appointments
        .filter(a => a.status === 'BOOKED')
        .sort((a, b) => new Date(
            a.appointmentDate) -
            new Date(b.appointmentDate))[0];

    // Get pending bills
    const pendingBills = bills.filter(
        b => b.paymentStatus !== 'PAID');

    if (loading) return (
        <div style={styles.loading}>
            Loading your data...
        </div>
    );

    return (
        <div>
            {/* Navbar */}
            <div style={styles.navbar}>
                <span style={styles.navTitle}>
                    👤 Patient Portal
                </span>
                <div style={styles.navLinks}>
                    <button
                        style={{
                            ...styles.navBtn,
                            backgroundColor:
                                page === 'profile'
                                ? 'rgba(255,255,255,0.3)'
                                : 'transparent'
                        }}
                        onClick={() =>
                            setPage('profile')}>
                        My Profile
                    </button>
                    <button
                        style={{
                            ...styles.navBtn,
                            backgroundColor:
                                page === 'appointments'
                                ? 'rgba(255,255,255,0.3)'
                                : 'transparent'
                        }}
                        onClick={() =>
                            setPage('appointments')}>
                        My Appointments
                    </button>
                    <button
                        style={{
                            ...styles.navBtn,
                            backgroundColor:
                                page === 'bills'
                                ? 'rgba(255,255,255,0.3)'
                                : 'transparent'
                        }}
                        onClick={() =>
                            setPage('bills')}>
                        My Bills
                    </button>
                    <button
                        style={{
                            ...styles.navBtn,
                            backgroundColor:
                                page === 'nextVisit'
                                ? 'rgba(255,255,255,0.3)'
                                : 'transparent'
                        }}
                        onClick={() =>
                            setPage('nextVisit')}>
                        Next Visit
                    </button>
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
                        {pendingBills.length}
                    </div>
                    <div style={styles.summaryLabel}>
                        Pending Bills
                    </div>
                </div>
                <div style={{
                    ...styles.summaryCard,
                    borderTop: '3px solid #1890ff'
                }}>
                    <div style={styles.summaryNum}>
                        {nextAppointment ?
                            nextAppointment
                                .appointmentDate :
                            'None'}
                    </div>
                    <div style={styles.summaryLabel}>
                        Next Appointment
                    </div>
                </div>
                <div style={{
                    ...styles.summaryCard,
                    borderTop: '3px solid #F57F17'
                }}>
                    <div style={{
                        ...styles.summaryNum,
                        fontSize: '16px',
                        color: patient?.status ===
                            'ADMITTED'
                            ? '#1D9E75' : '#F57F17'
                    }}>
                        {patient?.status || 'N/A'}
                    </div>
                    <div style={styles.summaryLabel}>
                        Current Status
                    </div>
                </div>
            </div>

            {/* Pages */}
            <div style={styles.content}>

                {/* Profile Page */}
                {page === 'profile' && patient && (
                    <div style={styles.card}>
                        <h3 style={styles.cardTitle}>
                            👤 My Profile
                        </h3>
                        <div style={styles.grid}>
                            <InfoItem label="Patient ID" value={`#${patient.pid}`}/>
                            <InfoItem label="Full Name" value={patient.pname}/>
                            <InfoItem label="Age" value={`${patient.age} years`}/>
                            <InfoItem label="Gender" value={patient.gender}/>
                            <InfoItem label="Blood Group" value={patient.bloodGroup} color="#E24B4A"/>
                            <InfoItem label="Phone" value={patient.pno}/>
                            <InfoItem label="Email" value={patient.email}/>
                            <InfoItem label="Address" value={patient.address}/>
                            <InfoItem label="Disease" value={patient.disease} color="#E24B4A"/>
                            <InfoItem label="Admission Date" value={patient.admissionDate}/>
                            <InfoItem label="Status" value={patient.status} color="#1D9E75"/>
                        </div>
                    </div>
                )}

                {/* Appointments Page */}
                {page === 'appointments' && (
                    <div style={styles.card}>
                        <h3 style={styles.cardTitle}>
                            📅 My Appointments
                        </h3>
                        {appointments.length === 0 ? (
                            <p style={styles.noData}>
                                No appointments found
                            </p>
                        ) : (
                            <table style={styles.table}>
                                <thead>
                                    <tr style={styles.tableHead}>
                                        <th style={styles.th}>
                                            ID
                                        </th>
                                        <th style={styles.th}>
                                            Doctor
                                        </th>
                                        <th style={styles.th}>
                                            Specialization
                                        </th>
                                        <th style={styles.th}>
                                            Date
                                        </th>
                                        <th style={styles.th}>
                                            Time
                                        </th>
                                        <th style={styles.th}>
                                            Reason
                                        </th>
                                        <th style={styles.th}>
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments.map(
                                        a => (
                                        <tr key={a.aid}
                                            style={styles.tr}>
                                            <td style={styles.td}>
                                                {a.aid}
                                            </td>
                                            <td style={styles.td}>
                                                {a.dname}
                                            </td>
                                            <td style={styles.td}>
                                                {a.specialization}
                                            </td>
                                            <td style={styles.td}>
                                                {a.appointmentDate}
                                            </td>
                                            <td style={styles.td}>
                                                {a.timeSlot}
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
                                                    ? '#E1F5EA'
                                                    : a.status === 'COMPLETED'
                                                    ? '#E8EAF6'
                                                    : '#FDEDEC',
                                                    color:
                                                    a.status === 'BOOKED'
                                                    ? '#1D9E75'
                                                    : a.status === 'COMPLETED'
                                                    ? '#3F51B5'
                                                    : '#E24B4A'
                                                }}>
                                                    {a.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}

                {/* Bills Page */}
                {page === 'bills' && (
                    <div style={styles.card}>
                        <h3 style={styles.cardTitle}>
                            💰 My Bills
                        </h3>
                        {bills.length === 0 ? (
                            <p style={styles.noData}>
                                No bills found
                            </p>
                        ) : (
                            bills.map(bill => (
                                <div
                                    key={bill.billId}
                                    style={styles.billCard}>
                                    <div style={styles.grid}>
                                        <InfoItem label="Bill ID" value={`#${bill.billId}`}/>
                                        <InfoItem label="Doctor" value={bill.doctorName}/>
                                        <InfoItem label="Disease" value={bill.disease}/>
                                        <InfoItem label="Consultation" value={`₹${bill.consultationFee}`}/>
                                        <InfoItem label="Medicine" value={`₹${bill.medicineCost}`}/>
                                        <InfoItem label="Room Charge" value={`₹${bill.roomCharge}`}/>
                                        <InfoItem label="Lab Tests" value={`₹${bill.labTestCharge}`}/>
                                        <InfoItem label="Total Amount" value={`₹${bill.totalAmount}`} color="#1890ff"/>
                                        <InfoItem label="Amount Paid" value={`₹${bill.amountPaid}`} color="#1D9E75"/>
                                        <InfoItem label="Balance Due" value={`₹${bill.balanceDue}`} color="#E24B4A"/>
                                        <InfoItem label="Payment Status" value={bill.paymentStatus} color={bill.paymentStatus === 'PAID' ? '#1D9E75' : '#E24B4A'}/>
                                        <InfoItem label="Payment Mode" value={bill.paymentMode}/>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* Next Visit Page */}
                {page === 'nextVisit' && (
                    <div style={styles.card}>
                        <h3 style={styles.cardTitle}>
                            🗓️ Next Visit
                        </h3>
                        {!nextAppointment ? (
                            <p style={styles.noData}>
                                No upcoming appointments
                            </p>
                        ) : (
                            <div style={styles.nextVisitCard}>
                                <div style={styles.nextVisitDate}>
                                    📅 {nextAppointment.appointmentDate}
                                </div>
                                <div style={styles.grid}>
                                    <InfoItem label="Doctor" value={nextAppointment.dname}/>
                                    <InfoItem label="Specialization" value={nextAppointment.specialization}/>
                                    <InfoItem label="Time Slot" value={nextAppointment.timeSlot}/>
                                    <InfoItem label="Reason" value={nextAppointment.reason}/>
                                    <InfoItem label="Status" value={nextAppointment.status} color="#1D9E75"/>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

// Reusable info item component
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
        backgroundColor: '#1D9E75',
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
        backgroundColor: '#EBF5FB',
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
        backgroundColor: '#EBF5FB',
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
        borderBottom: '2px solid #EBF5FB'
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
    tableHead: {
        backgroundColor: '#1D9E75',
        color: 'white'
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
    billCard: {
        border: '1px solid #f0f0f0',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '12px'
    },
    nextVisitCard: {
        border: '2px solid #1D9E75',
        borderRadius: '10px',
        padding: '20px'
    },
    nextVisitDate: {
        fontSize: '22px',
        fontWeight: '700',
        color: '#1D9E75',
        marginBottom: '16px',
        textAlign: 'center'
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
        color: '#1D9E75'
    }
};

export default PatientPortal;