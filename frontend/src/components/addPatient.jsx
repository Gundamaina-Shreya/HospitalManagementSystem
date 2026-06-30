import { useState } from "react";
import api  from "../services/api";

function AddPatient(){

    const [formData, setFormData]=useState({
    pname:'',
    age: '',
    gender: '',
    bloodGroup: '',
    pno: '',
    email: '',
    address: '',
    disease: '',
    status: 'ADMITTED'
    });

    const [success, setSuccess]=useState('');

    const [error, setError]=useState('');

    const [loading, setLoading]=useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!formData.pname || !formData.age || !formData.disease){
            setError('Name, Age and Disease are Required :(');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try{
             await api.post('/patients',formData);

             setSuccess('Patient Details added Successfully!');

             setFormData({
                 pname:'',
                 age: '',
                 gender: '',
                 bloodGroup: '',
                 pno: '',
                 email: '',
                 address: '',
                 disease: '',
                 status: 'ADMITTED'
             });
        }
        catch (err) {
            console.error(err);
            setError(err?.response?.data?.message || 'Failed to add patient details. Try Again!');
        }
        finally{
            setLoading(false);
        }
    };
    return (
        <div style={styles.container}>
            <div style={styles.formBox}>
                <h2 style={styles.title}>Add New Patient Details</h2>

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
                    <div style={styles.row}>
                        <div style={styles.lable}>
                            <lable style={styles.lable}>
                                Patient Name *
                            </lable>
                            <input
                                style={styles.input}
                                type="tex"
                                name="pname"
                                placeholder="Enter Patient Name"
                                value={formData.pname}
                                onChange={handleChange}
                                />
                        </div>
                        <div style={styles.field}>
                            <label le={styles.label}>
                                Age*
                            </label>
                            <input
                                style={styles.input}
                                type="number"
                                name="age"
                                placeholder="Enter Age"
                                value={formData.age}
                                onChange={handleChange}
                                />
                        </div>
                    </div>
                    <div style={styles.row}>
                        <div style={styles.field}>
                            <label style={styles.label}>
                                Gender
                            </label>
                            <select
                                style={styles.input}
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}>
                                    <option value=" ">
                                        Select Gender
                                    </option>
                                    <option value="Male">
                                        Male
                                    </option>
                                    <option value="Female">
                                        Female
                                    </option>
                                    <option value="Other">
                                        Other
                                    </option>
                                </select>
                        </div>
                        <div style={styles.field}>
                            <label style={styles.label}>
                                Blood Group
                            </label>
                            <select
                                style={styles.input}
                                name="bloodGroup"
                                value={formData.bloodGroup}
                                onChange={handleChange}>
                                <option value="">
                                    Select Blood Group
                                    </option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                </select>
                        </div>
                    </div>
                    <div style={styles.row}>
                        <div style={styles.field}>
                            <label style={styles.label}>
                                Phone Number
                            </label>
                            <input
                                style={styles.input}
                                type="number"
                                name="pno"
                                placeholder="Enter phone number"
                                value={formData.pno}
                                onChange={handleChange}
                                />
                        </div>
                        <div style={styles.field}>
                            <label style={styles.label}>
                                Email
                            </label>
                            <input
                                style={styles.input}
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                value={formData.email}
                                onChange={handleChange}
                                />
                                </div>
                                </div>
                                <div style={styles.row}>
                                    <div style={styles.field}>
                                        <label style={styles.label}>
                                            Disease *
                                        </label>
                                        <input
                                            style={styles.input}
                                            type="text"
                                            name="disease"
                                            placeholder="Enter disease"
                                            value={formData.disease}
                                            onChange={handleChange}
                                            />
                                    </div>
                                
                                <div style={styles.field}>
                                    <label style={styles.label}>
                                        Status
                                        </label>
                                        <select
                                            style={styles.input}
                                            name="status"
                                            value={formData.status}
                                            onChange={handleChange}>
                                                <option value="ADMITTED">
                                                    ADMITTED
                                                    </option>
                                                <option value="OPD">
                                                    OPD
                                                    </option>
                                                <option value="DISCHARGED">
                                                    DISCHARGED
                                                    </option>
                                            </select>
                                </div>
                                </div>

                                <div style={styles.fieldFull}>
                                    <label style={styles.label}>
                                        Address
                                    </label>
                                    <textarea
                                        style={styles.textarea}
                                        name="address"
                                        placeholder="Enter Address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        rows="3"
                                        />
                                </div>

                                <button
                                    style={{
                                        ...styles.button,
                                        opacity: loading ? 0.7 : 1
                                    }}
                                    type="submit"
                                    disabled={loading}>
                                        {loading ? 
                                            'Adding Patient...': 
                                            'Add Patient'
                                        }
                                    </button>
                </form>
            </div>
        </div>
    );
}

const styles={
    container: {
        padding: '20px',
        backgroundColor: '#b9e5ff',
        minHeight: '100vh',
        textAlign:'left'
    },
    formBox:{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 20px 10px rgba(0,0,0,0.1)',
        maxWidth: '900px',
        margin: '0 auto'
    },
    title: {
        color: '#023e77',
        marginBottom: '20px',
        textAlign: 'left'
    },
    row:{
        display: 'flex',
        gap:'20px',
        marginBottom: '15px'
    },
    field: {
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        marginBottom: '15px',
        textAlign: 'left'
    },
    label:{
        fontSize: '13px',
        fontWeight:'500',
        color: '#333',
        textAlign:'left'
    },
    input: {
        padding: '10px 12px',
        borderRadius: '6px',
        border: '1px solid #938f8f',
        fontSize:'14px',
        width: '100%',
        backgroundColor:'#d7fdfd',
        color:'#425d77',
        outline:'none',
        boxSizing:'border-box'
    },
     textarea: {
        padding: '10px 12px',
        borderRadius: '6px',
        border: '1px solid #938f8f',
        fontSize:'14px',
        width: '100%',
        backgroundColor:'#d7fdfd',
        color:'#425d77',
        resize:'vertical',
        textAlign:'left',
        outline:'none',
        boxSizing:'border-box'

    },
     button: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#2d6395',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
        marginTop: '10px',
        leftSpacing:'0.5px'
    },
    success: {
        backgroundColor: '#f6ffed',
        border: '1px solid #b7eb8f',
        color: '#81f747',
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '15px',
        textAlign: 'left',
        fontSize:'14px',
        fontWeight:'500'
    },
    error: {
        backgroundColor: '#fdedec',
        border: '1px solid #f1948a',
         color: '#C03928',
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '15px',
        textAlign: 'left',
        fontSize:'14px',
        fontWeight:'500'
    }
};

export default AddPatient;