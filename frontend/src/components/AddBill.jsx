import { useState, useEffect } from 'react';
import api from '../services/api';

function AddBill() {
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        pid: '',
        patientName: '',
        doctorName: '',
        disease: '',
        consultationFee: '',
        medicineCost: '',
        roomCharge: '',
        numberOfDays: '',
        labTestCharge: '',
        nursingCharge: '',
        ambulanceCharge: '',
        otherCharges: '',
        discount: '',
        taxPercent: '',
        amountPaid: '',
        paymentMode: 'CASH'
    });

    // Load patients and doctors on component mount
    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await api.get('/patients');
                setPatients(res.data);
            } catch (err) {
                console.error(err);
            }

            try {
                const res = await api.get('/doctors');
                setDoctors(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        loadData();
    }, []);

    // ✅ When patient selected — auto fill name and disease
    const handlePatientChange = (e) => {
        const selectedPid = e.target.value;
        const selectedPatient = patients.find(
            p => p.pid === parseInt(selectedPid));

        setFormData({
            ...formData,
            pid: selectedPid,
            patientName: selectedPatient?.pname || '',
            disease: selectedPatient?.disease || ''
        });
    };

    const handleDoctorChange = (e) => {
        const selectedDoctorName = e.target.value;
        const selectedDoctor = doctors.find(
            d => d.dname === selectedDoctorName);

        setFormData({
            ...formData,
            doctorName: selectedDoctorName,
            consultationFee:
                selectedDoctor?.consultingFee || ''
        });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Auto calculate total
    const calculateTotal = () => {
        const consultation =
            parseFloat(formData.consultationFee)||0;
        const medicine =
            parseFloat(formData.medicineCost)||0;
        const room =
            (parseFloat(formData.roomCharge)||0) *
            (parseInt(formData.numberOfDays)||1);
        const lab =
            parseFloat(formData.labTestCharge)||0;
        const nursing =
            parseFloat(formData.nursingCharge)||0;
        const ambulance =
            parseFloat(formData.ambulanceCharge)||0;
        const other =
            parseFloat(formData.otherCharges)||0;
        const discount =
            parseFloat(formData.discount)||0;
        const tax =
            parseFloat(formData.taxPercent)||0;

        const subTotal = consultation + medicine +
            room + lab + nursing +
            ambulance + other;
        const afterDiscount = subTotal - discount;
        const taxAmount = (afterDiscount * tax)/100;
        const total = afterDiscount + taxAmount;

        return total.toFixed(2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.pid || !formData.doctorName) {
            setError(
                'Please select patient and doctor!');
            return;
        }
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await api.post('/bills', {
                ...formData,
                pid: parseInt(formData.pid),
                consultationFee:
                    parseFloat(
                        formData.consultationFee)||0,
                medicineCost:
                    parseFloat(
                        formData.medicineCost)||0,
                roomCharge:
                    parseFloat(
                        formData.roomCharge)||0,
                numberOfDays:
                    parseInt(
                        formData.numberOfDays)||1,
                labTestCharge:
                    parseFloat(
                        formData.labTestCharge)||0,
                nursingCharge:
                    parseFloat(
                        formData.nursingCharge)||0,
                ambulanceCharge:
                    parseFloat(
                        formData.ambulanceCharge)||0,
                otherCharges:
                    parseFloat(
                        formData.otherCharges)||0,
                discount:
                    parseFloat(
                        formData.discount)||0,
                taxPercent:
                    parseFloat(
                        formData.taxPercent)||0,
                amountPaid:
                    parseFloat(
                        formData.amountPaid)||0
            });

            setSuccess(
                '✅ Bill created successfully!');

            // Reset form
            setFormData({
                pid: '',
                patientName: '',
                doctorName: '',
                disease: '',
                consultationFee: '',
                medicineCost: '',
                roomCharge: '',
                numberOfDays: '',
                labTestCharge: '',
                nursingCharge: '',
                ambulanceCharge: '',
                otherCharges: '',
                discount: '',
                taxPercent: '',
                amountPaid: '',
                paymentMode: 'CASH'
            });

        } catch (err) {
            console.error(err);
            setError('Failed to create bill!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formBox}>
                <h2 style={styles.title}>
                    💰 Create Patient Bill
                </h2>

                {success && (
                    <div style={styles.success}>
                        {success}
                    </div>
                )}
                {error && (
                    <div style={styles.error}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    {/* Select Patient */}
                    <div style={styles.row}>
                        <div style={styles.field}>
                            <label style={styles.label}>
                                Select Patient *
                            </label>
                            <select
                                style={styles.input}
                                onChange={
                                    handlePatientChange}
                                value={formData.pid}>
                                <option value="">
                                    -- Select Patient --
                                </option>
                                {patients.map(p => (
                                    <option
                                        key={p.pid}
                                        value={p.pid}>
                                        {p.pname}
                                        (ID: #{p.pid})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div style={styles.field}>
                            <label style={styles.label}>
                                Select Doctor *
                            </label>
                            <select
                                style={styles.input}
                                onChange={
                                    handleDoctorChange}
                                value={formData.doctorName}>
                                <option value="">
                                    -- Select Doctor --
                                </option>
                                {doctors.map(d => (
                                    <option
                                        key={d.did}
                                        value={d.dname}>
                                        {d.dname} —
                                        {d.specialization}
                                        (₹{d.consultingFee})
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Auto-filled fields */}
                    <div style={styles.row}>
                        <div style={styles.field}>
                            <label style={styles.label}>
                                Patient Name
                            </label>
                            <input
                                style={{
                                    ...styles.input,
                                    backgroundColor:
                                    '#f9f9f9'
                                }}
                                type="text"
                                value={
                                    formData.patientName}
                                readOnly
                                placeholder="Auto-filled"/>
                        </div>
                        <div style={styles.field}>
                            <label style={styles.label}>
                                Disease
                            </label>
                            <input
                                style={{
                                    ...styles.input,
                                    backgroundColor:
                                    '#f9f9f9'
                                }}
                                type="text"
                                value={formData.disease}
                                readOnly
                                placeholder="Auto-filled"/>
                        </div>
                    </div>

                    <div style={styles.divider}>
                        💊 Charges
                    </div>

                    {/* Charges */}
                    <div style={styles.row}>
                        <div style={styles.field}>
                            <label style={styles.label}>
                                Consultation Fee (₹)
                            </label>
                            <input
                                style={styles.input}
                                type="number"
                                name="consultationFee"
                                placeholder="Auto from doctor"
                                value={
                                formData.consultationFee}
                                onChange={handleChange}/>
                        </div>
                        <div style={styles.field}>
                            <label style={styles.label}>
                                Medicine Cost (₹)
                            </label>
                            <input
                                style={styles.input}
                                type="number"
                                name="medicineCost"
                                placeholder="0"
                                value={
                                formData.medicineCost}
                                onChange={handleChange}/>
                        </div>
                    </div>

                    <div style={styles.row}>
                        <div style={styles.field}>
                            <label style={styles.label}>
                                Room Charge/day (₹)
                            </label>
                            <input
                                style={styles.input}
                                type="number"
                                name="roomCharge"
                                placeholder="0"
                                value={formData.roomCharge}
                                onChange={handleChange}/>
                        </div>
                        <div style={styles.field}>
                            <label style={styles.label}>
                                Number of Days
                            </label>
                            <input
                                style={styles.input}
                                type="number"
                                name="numberOfDays"
                                placeholder="1"
                                value={
                                formData.numberOfDays}
                                onChange={handleChange}/>
                        </div>
                    </div>

                    <div style={styles.row}>
                        <div style={styles.field}>
                            <label style={styles.label}>
                                Lab Test Charge (₹)
                            </label>
                            <input
                                style={styles.input}
                                type="number"
                                name="labTestCharge"
                                placeholder="0"
                                value={
                                formData.labTestCharge}
                                onChange={handleChange}/>
                        </div>
                        <div style={styles.field}>
                            <label style={styles.label}>
                                Nursing Charge (₹)
                            </label>
                            <input
                                style={styles.input}
                                type="number"
                                name="nursingCharge"
                                placeholder="0"
                                value={
                                formData.nursingCharge}
                                onChange={handleChange}/>
                        </div>
                    </div>

                    <div style={styles.row}>
                        <div style={styles.field}>
                            <label style={styles.label}>
                                Ambulance Charge (₹)
                            </label>
                            <input
                                style={styles.input}
                                type="number"
                                name="ambulanceCharge"
                                placeholder="0"
                                value={
                                formData.ambulanceCharge}
                                onChange={handleChange}/>
                        </div>
                        <div style={styles.field}>
                            <label style={styles.label}>
                                Other Charges (₹)
                            </label>
                            <input
                                style={styles.input}
                                type="number"
                                name="otherCharges"
                                placeholder="0"
                                value={
                                formData.otherCharges}
                                onChange={handleChange}/>
                        </div>
                    </div>

                    <div style={styles.divider}>
                        🧾 Discount & Tax
                    </div>

                    <div style={styles.row}>
                        <div style={styles.field}>
                            <label style={styles.label}>
                                Discount (₹)
                            </label>
                            <input
                                style={styles.input}
                                type="number"
                                name="discount"
                                placeholder="0"
                                value={formData.discount}
                                onChange={handleChange}/>
                        </div>
                        <div style={styles.field}>
                            <label style={styles.label}>
                                Tax (%)
                            </label>
                            <input
                                style={styles.input}
                                type="number"
                                name="taxPercent"
                                placeholder="0"
                                value={
                                formData.taxPercent}
                                onChange={handleChange}/>
                        </div>
                    </div>

                    {/* ✅ Auto calculated total */}
                    <div style={styles.totalBox}>
                        <span style={styles.totalLabel}>
                            Estimated Total:
                        </span>
                        <span style={styles.totalAmount}>
                            ₹{calculateTotal()}
                        </span>
                    </div>

                    <div style={styles.divider}>
                        💳 Payment
                    </div>

                    <div style={styles.row}>
                        <div style={styles.field}>
                            <label style={styles.label}>
                                Amount Paid (₹)
                            </label>
                            <input
                                style={styles.input}
                                type="number"
                                name="amountPaid"
                                placeholder="0"
                                value={
                                formData.amountPaid}
                                onChange={handleChange}/>
                        </div>
                        <div style={styles.field}>
                            <label style={styles.label}>
                                Payment Mode
                            </label>
                            <select
                                style={styles.input}
                                name="paymentMode"
                                value={
                                formData.paymentMode}
                                onChange={handleChange}>
                                <option value="CASH">
                                    CASH
                                </option>
                                <option value="CARD">
                                    CARD
                                </option>
                                <option value="UPI">
                                    UPI
                                </option>
                                <option value="INSURANCE">
                                    INSURANCE
                                </option>
                            </select>
                        </div>
                    </div>

                    <button
                        style={{
                            ...styles.submitBtn,
                            opacity: loading ? 0.7 : 1
                        }}
                        type="submit"
                        disabled={loading}>
                        {loading ?
                            'Creating Bill...' :
                            '💰 Create Bill'}
                    </button>
                </form>
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#EBF5FB',
        minHeight: '100vh'
    },
    formBox: {
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        maxWidth: '800px',
        margin: '0 auto'
    },
    title: {
        color: '#1890ff',
        marginBottom: '20px',
        fontSize: '22px',
        fontWeight: '600',
        borderBottom: '2px solid #1890ff',
        paddingBottom: '10px'
    },
    row: {
        display: 'flex',
        gap: '20px',
        marginBottom: '15px'
    },
    field: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '5px'
    },
    label: {
        fontSize: '13px',
        fontWeight: '600',
        color: '#2C3E50'
    },
    input: {
        padding: '10px 12px',
        borderRadius: '6px',
        border: '1px solid #ddd',
        fontSize: '14px',
        width: '100%',
        boxSizing: 'border-box'
    },
    divider: {
        backgroundColor: '#EBF5FB',
        padding: '8px 12px',
        borderRadius: '6px',
        fontSize: '13px',
        fontWeight: '600',
        color: '#1890ff',
        marginBottom: '15px',
        marginTop: '5px'
    },
    totalBox: {
        backgroundColor: '#E6F1FB',
        border: '2px solid #1890ff',
        borderRadius: '8px',
        padding: '15px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '15px'
    },
    totalLabel: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#2C3E50'
    },
    totalAmount: {
        fontSize: '24px',
        fontWeight: '700',
        color: '#1890ff'
    },
    submitBtn: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#1D9E75',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        marginTop: '10px'
    },
    success: {
        backgroundColor: '#E1F5EE',
        border: '1px solid #1D9E75',
        color: '#085041',
        padding: '12px',
        borderRadius: '6px',
        marginBottom: '15px',
        textAlign: 'center'
    },
    error: {
        backgroundColor: '#FDEDEC',
        border: '1px solid #F1948A',
        color: '#C0392B',
        padding: '12px',
        borderRadius: '6px',
        marginBottom: '15px',
        textAlign: 'center'
    }
};

export default AddBill;