import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function DoctorLoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post(
                '/authentication/login', {
                    username,
                    password
                });

            const token = response.data.token
                            || response.data;
            const referenceId =
                response.data.referenceId
                || response.data.referenceID;

            localStorage.setItem('token', token);
            localStorage.setItem('role', 'DOCTOR');
            localStorage.setItem(
                'referenceId', referenceId);
            localStorage.setItem(
                'username',
                response.data.username);

            navigate('/doctor-portal');

        } catch (error) {
            console.error(error);
            setError(
                'Invalid username or password!');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.box}>

                <button
                    style={styles.backBtn}
                    onClick={() => navigate('/')}>
                    ← Back to Home
                </button>

                <div style={styles.icon}>👨‍⚕️</div>

                <h2 style={styles.title}>
                    Doctor Login
                </h2>

                <p style={styles.subtitle}>
                    View your appointments
                    and daily schedule
                </p>

                {/* ✅ Hint box */}
                <div style={styles.hintBox}>
                    <strong>Login with:</strong>
                    <br/>
                    Username: Your email address
                    <br/>
                    Password: Your phone number
                </div>

                {error && (
                    <div style={styles.error}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <input
                        style={styles.input}
                        type="text"
                        placeholder="Email Address"
                        value={username}
                        onChange={(e) =>
                            setUsername(
                                e.target.value)}
                    />
                    <input
                        style={styles.input}
                        type="password"
                        placeholder="Password (Phone Number)"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value)}
                    />
                    <button
                        style={styles.btn}
                        type="submit">
                        Login as Doctor
                    </button>
                </form>
            </div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#E8EAF6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    box: {
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '15px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        width: '350px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
    },
    backBtn: {
        background: 'none',
        border: 'none',
        color: '#3F51B5',
        cursor: 'pointer',
        fontSize: '13px',
        textAlign: 'left',
        padding: 0
    },
    icon: {
        fontSize: '50px',
        textAlign: 'center'
    },
    title: {
        color: '#3F51B5',
        textAlign: 'center',
        margin: 0,
        fontSize: '24px'
    },
    subtitle: {
        color: '#999',
        textAlign: 'center',
        fontSize: '13px',
        margin: 0
    },
    // ✅ Hint box style
    hintBox: {
        backgroundColor: '#E8EAF6',
        border: '1px solid #3F51B5',
        borderRadius: '8px',
        padding: '10px',
        fontSize: '12px',
        color: '#3F51B5',
        textAlign: 'center',
        lineHeight: '1.8'
    },
    error: {
        backgroundColor: '#FDEDEC',
        color: '#C0392B',
        padding: '10px',
        borderRadius: '5px',
        fontSize: '13px',
        textAlign: 'center'
    },
    input: {
        width: '100%',
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        fontSize: '14px',
        boxSizing: 'border-box',
        marginBottom: '10px'
    },
    btn: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#3F51B5',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '15px',
        fontWeight: '600',
        cursor: 'pointer'
    }
};

export default DoctorLoginPage;