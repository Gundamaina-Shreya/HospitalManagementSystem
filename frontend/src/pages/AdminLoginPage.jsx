import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function AdminLoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post(
                '/authentication/login', {
                  username:  username,
                   password: password,
                   role: null,
                   referenceID:null
                });
                console.log('Full response: ',response.data);

                const token=response.data.token;
                const role=response.data.role;

                if(!token){
                    setError('Login Failed - no token!');
                    return ;
                }

                localStorage.setItem('token',token);
                localStorage.setItem('role',role);

                localStorage.setItem(
                    'username',response.username);
                    navigate('/admin-portal');

        }
        catch(error){
            console.error('Login error: ',error);
            setError('Invalid username or password!');
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
                <div style={styles.icon}>👑</div>
                <h2 style={styles.title}>
                    Admin Login
                </h2>
                <p style={styles.subtitle}>
                    Manage patients, doctors
                    and appointments
                </p>
                {error && (
                    <div style={styles.error}>
                        {error}
                    </div>
                )}
                <form onSubmit={handleLogin}>
                    <input
                        style={styles.input}
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)}
                    />
                    <input
                        style={styles.input}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)}
                    />
                    <button
                        style={styles.btn}
                        type="submit">
                        Login as Admin
                    </button>
                </form>
            </div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#FFF8E1',
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
        color: '#F57F17',
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
        color: '#F57F17',
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
        backgroundColor: '#F57F17',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '15px',
        fontWeight: '600',
        cursor: 'pointer'
    }
};

// ✅ This line is MANDATORY!
export default AdminLoginPage;