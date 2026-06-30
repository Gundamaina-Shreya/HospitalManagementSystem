import { useEffect, useState } from 'react';
import api from '../services/api';
import PatientDetails from './patientDetails';

function PatientList() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('ALL');
    const [selectedPatient, setSelectedPatient] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await api.get('/patients');
                setPatients(response.data);
                setError('');
            } catch (err) {
                console.error(err);
                setError('Failed to load patient details');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const getFilteredPatients = () => {
        if (activeTab === 'ALL') {
            return patients;
        }
        return patients.filter((patient) => patient.status === activeTab);
    };

    const counts = {
        ALL: patients.length,
        ADMITTED: patients.filter((patient) => patient.status === 'ADMITTED').length,
        DISCHARGED: patients.filter((patient) => patient.status === 'DISCHARGED').length,
        OPD: patients.filter((patient) => patient.status === 'OPD').length,
    };

    if (selectedPatient) {
        return (
            <PatientDetails
                patient={selectedPatient}
                onBack={() => setSelectedPatient(null)}
            />
        );
    }

    if (loading) {
        return <div style={styles.loading}>Loading patient details...</div>;
    }

    if (error) {
        return <div style={styles.errorMsg}>{error}</div>;
    }

    const filtered = getFilteredPatients();

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Patient Management</h2>

            <div style={styles.tabContainer}>
                {['ALL', 'ADMITTED', 'DISCHARGED', 'OPD'].map((tab) => (
                    <button
                        key={tab}
                        style={{
                            ...styles.tab,
                            backgroundColor:
                                activeTab === tab ? tabColors[tab] : '#f0f0f0',
                            color: activeTab === tab ? 'white' : '#666',
                        }}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                        <span style={styles.badge}>{counts[tab]}</span>
                    </button>
                ))}
            </div>

            {filtered.length === 0 ? (
                <div style={styles.noData}>
                    No {activeTab === 'ALL' ? '' : activeTab} patients found
                </div>
            ) : (
                <table style={styles.table}>
                    <thead>
                        <tr style={{ backgroundColor: '#1890ff', color: 'white' }}>
                            <th style={styles.th}>ID</th>
                            <th style={styles.th}>Name</th>
                            <th style={styles.th}>Age</th>
                            <th style={styles.th}>Gender</th>
                            <th style={styles.th}>Disease</th>
                            <th style={styles.th}>Blood Group</th>
                            <th style={styles.th}>Status</th>
                            <th style={styles.th}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((patient) => (
                            <tr key={patient.pid} style={styles.tr}>
                                <td style={styles.td}>{patient.pid}</td>
                                <td style={styles.td}>
                                    <span
                                        style={styles.clickableName}
                                        onClick={() => setSelectedPatient(patient)}
                                    >
                                        {patient.pname}
                                    </span>
                                </td>
                                <td style={styles.td}>{patient.age}</td>
                                <td style={styles.td}>{patient.gender}</td>
                                <td style={styles.td}>{patient.disease}</td>
                                <td style={styles.td}>{patient.bloodGroup}</td>
                                <td style={styles.td}>
                                    <span
                                        style={{
                                            padding: '4px 10px',
                                            borderRadius: '20px',
                                            fontSize: '12px',
                                            fontWeight: '600',
                                            backgroundColor:
                                                patient.status === 'ADMITTED'
                                                    ? '#E1F5EA'
                                                    : patient.status === 'DISCHARGED'
                                                      ? '#E8EAF6'
                                                      : '#FFF8E1',
                                            color:
                                                patient.status === 'ADMITTED'
                                                    ? '#1D9E75'
                                                    : patient.status === 'DISCHARGED'
                                                      ? '#3F51B5'
                                                      : '#F57F17',
                                        }}
                                    >
                                        {patient.status}
                                    </span>
                                </td>
                                <td style={styles.td}>
                                    <button
                                        style={styles.viewBtn}
                                        onClick={() => setSelectedPatient(patient)}
                                    >
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

const tabColors = {
    ALL: '#1890ff',
    ADMITTED: '#1D9E75',
    DISCHARGED: '#3F51B5',
    OPD: '#F57F17',
};

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#EBF5FB',
        minHeight: '100vh',
    },
    title: {
        color: '#1890ff',
        marginBottom: '20px',
        fontSize: '22px',
        fontWeight: '600',
        borderBottom: '2px solid #1890ff',
        paddingBottom: '10px',
    },
    tabContainer: {
        display: 'flex',
        gap: '10px',
        marginBottom: '20px',
        flexWrap: 'wrap',
    },
    tab: {
        padding: '8px 20px',
        borderRadius: '20px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '13px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'all 0.2s',
    },
    badge: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: '10px',
        padding: '1px 7px',
        fontSize: '11px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: 'white',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    },
    th: {
        padding: '12px 15px',
        textAlign: 'left',
        fontSize: '13px',
        fontWeight: '600',
    },
    tr: {
        borderBottom: '1px solid #f0f0f0',
        transition: 'background 0.2s',
    },
    td: {
        padding: '12px 15px',
        fontSize: '13px',
        color: '#333',
    },
    clickableName: {
        cursor: 'pointer',
        color: '#1890ff',
        fontWeight: '600',
    },
    viewBtn: {
        backgroundColor: '#1890ff',
        color: 'white',
        border: 'none',
        padding: '5px 12px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '12px',
    },
    noData: {
        textAlign: 'center',
        padding: '40px',
        color: '#999',
        fontSize: '16px',
        backgroundColor: 'white',
        borderRadius: '10px',
    },
    errorMsg: {
        textAlign: 'center',
        padding: '40px',
        fontSize: '16px',
        color: 'red',
    },
    loading: {
        textAlign: 'center',
        padding: '40px',
        fontSize: '16px',
        color: '#666',
    },
};

export default PatientList;