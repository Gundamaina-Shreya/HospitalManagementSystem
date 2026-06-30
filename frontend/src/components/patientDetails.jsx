import { useEffect, useState } from 'react';
import api from '../services/api';

const statusStyles = (status) => ({
  backgroundColor:
    status === 'ADMITTED'
      ? '#E1F5EA'
      : status === 'DISCHARGED'
      ? '#E8EAF6'
      : '#FFF8E1',
  color:
    status === 'ADMITTED'
      ? '#1D9E75'
      : status === 'DISCHARGED'
      ? '#3F51B5'
      : '#F57F17',
});

function PatientDetails({ patient, onBack }) {
  const [bills, setBills] = useState([]);
  const [loadingBills, setLoadingBills] = useState(true);

  useEffect(() => {
    const loadBills = async () => {
      try {
        const response = await api.get(`/bills/patient/${patient.pid}`);
        setBills(response.data || []);
      } catch (err) {
        console.error(err);
        setBills([]);
      } finally {
        setLoadingBills(false);
      }
    };

    if (patient?.pid) {
      loadBills();
    }
  }, [patient]);

  if (!patient) {
    return null;
  }

  return (
    <div style={styles.container}>
      <button style={styles.backBtn} onClick={onBack}>
        Back to Patient List
      </button>

      <h2 style={styles.title}>Patient Case Study</h2>

      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Personal Information</h3>
        <div style={styles.grid}>
          <div style={styles.infoItem}>
            <span style={styles.infoLabel}>Patient ID</span>
            <span style={styles.infoValue}>#{patient.pid}</span>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.infoLabel}>Name</span>
            <span style={styles.infoValue}>{patient.pname || 'N/A'}</span>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.infoLabel}>Age</span>
            <span style={styles.infoValue}>
              {patient.age ?? 'N/A'} years
            </span>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.infoLabel}>Blood Group</span>
            <span style={{ ...styles.infoValue, color: '#E24B4A', fontWeight: '700' }}>
              {patient.bloodGroup || 'N/A'}
            </span>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.infoLabel}>Phone</span>
            <span style={styles.infoValue}>{patient.pno || 'N/A'}</span>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.infoLabel}>Address</span>
            <span style={styles.infoValue}>{patient.address || 'N/A'}</span>
          </div>
        </div>
      </div>

      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Medical Information</h3>
        <div style={styles.grid}>
          <div style={styles.infoItem}>
            <span style={styles.infoLabel}>Disease / Diagnosis</span>
            <span style={{ ...styles.infoValue, color: '#E24B4A', fontWeight: '600' }}>
              {patient.disease || 'N/A'}
            </span>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.infoLabel}>Admission Date</span>
            <span style={styles.infoValue}>{patient.admissionDate || 'N/A'}</span>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.infoLabel}>Current Status</span>
            <span style={{ ...styles.infoValue, ...styles.statusBadge, ...statusStyles(patient.status) }}>
              {patient.status || 'UNKNOWN'}
            </span>
          </div>
        </div>
      </div>

      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Billing Information</h3>
        {loadingBills ? (
          <p>Loading bills...</p>
        ) : bills.length === 0 ? (
          <p style={{ color: '#999' }}>No bill found for this patient</p>
        ) : (
          bills.map((bill) => (
            <div key={bill.billId} style={styles.billCard}>
              <div style={styles.grid}>
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>Bill Id</span>
                  <span style={styles.infoValue}>#{bill.billId}</span>
                </div>
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>Consultation Fee</span>
                  <span style={styles.infoValue}>{bill.consultationFee ?? 'N/A'}</span>
                </div>
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>Medicine Cost</span>
                  <span style={styles.infoValue}>{bill.medicineCost ?? 'N/A'}</span>
                </div>
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>Room Charge</span>
                  <span style={styles.infoValue}>{bill.roomCharge ?? 'N/A'}</span>
                </div>
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>Lab Test Charge</span>
                  <span style={styles.infoValue}>{bill.labTestCharge ?? 'N/A'}</span>
                </div>
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>Discount</span>
                  <span style={{ ...styles.infoValue, color: '#1D9E75' }}>{bill.discount ?? 'N/A'}</span>
                </div>
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>Tax ({bill.taxPercent ?? 0}%)</span>
                  <span style={styles.infoValue}>{bill.taxAmount ?? 'N/A'}</span>
                </div>
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>Total Amount</span>
                  <span style={{ ...styles.infoValue, fontSize: '18px', fontWeight: '700', color: '#1890ff' }}>
                    {bill.totalAmount ?? 'N/A'}
                  </span>
                </div>
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>Balance Due</span>
                  <span style={{ ...styles.infoValue, color: '#E24B4A', fontWeight: '700' }}>{bill.balanceDue ?? 'N/A'}</span>
                </div>
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>Payment Status</span>
                  <span style={{ ...styles.infoValue, ...styles.statusBadge, ...statusStyles(bill.paymentStatus) }}>
                    {bill.paymentStatus || 'UNKNOWN'}
                  </span>
                </div>
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>Payment Mode</span>
                  <span style={styles.infoValue}>{bill.paymentMode || 'N/A'}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#EBF5FB',
    minHeight: '100vh',
  },
  backBtn: {
    backgroundColor: 'transparent',
    border: '1px solid #1890ff',
    color: '#1890ff',
    padding: '8px 16px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '13px',
    marginBottom: '15px',
    fontWeight: '500',
  },
  title: {
    color: '#1890ff',
    marginBottom: '20px',
    fontSize: '22px',
    fontWeight: '600',
    borderBottom: '2px solid #1890ff',
    paddingBottom: '10px',
  },
  card: {
    backgroundColor: '#eaf6ff',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: '15px',
    paddingBottom: '8px',
    borderBottom: '1px solid #f0f0f0',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px',
  },
  infoItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  infoLabel: {
    fontSize: '11px',
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    fontWeight: '600',
  },
  infoValue: {
    fontSize: '14px',
    color: '#333',
  },
  statusBadge: {
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '700',
    display: 'inline-flex',
    alignItems: 'center',
  },
  billCard: {
    border: '1px solid #f0f0f0',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '10px',
  },
};

export default PatientDetails;
