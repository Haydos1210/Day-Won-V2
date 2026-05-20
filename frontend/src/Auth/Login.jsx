import { Link } from 'react-router-dom';
import {
    Button,
    TextField,
    Alert,
    Box,
    Typography,
    CircularProgress
} from '@mui/material';
import styles from './Login.module.css'
import { useState } from 'react';
import axios from 'axios';

function Login({ successCallback }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const login = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Error: please fill in all fields");
            return;
        }

        if (!email.includes('@')) {
            setError("Error: email address is invalid");
            return;
        }

        setLoading(true);

        try {
            const res = await axios.post('http://localhost:5500/login', {
                email,
                password,
            });

            const token = res.data.token;
            localStorage.setItem('token', token);

            if (successCallback) successCallback();
        } catch (err) {
            setError("Error: login failed");
        } finally {
            setLoading(false);
        }
    };

  return (
    <div className={styles.loginContainer}>
        <Box component="form" className={styles.formBox} onSubmit={login}>
            <Typography variant="h4" className={styles.title}>Sign In</Typography>
            {error && (
                <Alert
                severity="error"
                onClose={() => setError('')}
                >
                    {error}
                </Alert>
            )}

            <TextField label="Email" type="email" variant="outlined" fullWidth sx={{ input: { color: "white" }, label: { color: "white" } }} value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField label="Password" type="password" variant="outlined" fullWidth sx={{ input: { color: "white" }, label: { color: "white" } }} value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className={styles.actions}>
                <Button type='submit' variant="contained" disabled={loading} fullWidth>
                    {loading
                        ? <CircularProgress size={24} color="inherit" />
                        : "Login"
                    }
                </Button>
                <Link to='/' className={styles.link}>
                    <Button variant="outlined" fullWidth>Back</Button>
                </Link>
            </div>

            <Typography variant="body2" className={styles.footerLink}>
                No account? <Link to='/Register'>Register</Link>
            </Typography>
        </Box>
    </div>
  );
}

export default Login;