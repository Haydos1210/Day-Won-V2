import { Link } from 'react-router-dom';
import styles from './Register.module.css'
import { useState } from 'react'

import {
  Button,
  TextField,
  Alert,
  Box,
  Typography,
  CircularProgress
} from '@mui/material';

function Register({ authenticate }) {
    const [nameFirst, setNameFirst] = useState('');
    const [nameLast, setNameLast] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const register = async (e) => {
        e.preventDefault();

        if (!nameFirst || !nameLast || !email || !password || !confirmPassword) {
            setError("Error: please fill all fields");
            return;
        }

        if (!email.includes('@')) {
            setError('Invalid email address');
            return;
        }

        if (password != confirmPassword) {
            setError('Error: passwords do not match.');
            return;
        }

        try {
            setLoading(true);
            setError('');
            const registerRes = await fetch('http://localhost:5500/register', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    nameFirst,
                    nameLast,
                    email,
                    password
                }),
            });
            const registerData = await registerRes.json();

            if (!registerRes.ok) {
                setError(registerData.error || 'Registration failed');
                return;
            }

            const loginRes = await fetch('http://localhost:5500/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password
                }),
            });

            const loginData = await loginRes.json();

            if (!loginRes.ok) {
                setError(loginData.error || 'Login failed');
                return;
            }

            localStorage.setItem('token', loginData.token);

            if (authenticate) authenticate();
        } catch (err) {
            console.error(err);
            setError('Error: registration failed.');
        } finally {
            setLoading(false);
        }
    };

  return (
    <div className={styles.registerContainer}>
        <Box component="form" className={styles.formBox} onSubmit={register}>
            <Typography variant="h4" className={styles.title}>Register</Typography>
            {error && (
                <Alert
                severity="error"
                onClose={() => setError('')}
                >
                    {error}
                </Alert>
            )}
            <TextField label="First Name" fullWidth value={nameFirst} onChange={(e) => setNameFirst(e.target.value)} sx={{ input: { color: "white" }, label: { color: "white" } }} />
            <TextField label="Last Name" fullWidth value={nameLast} onChange={(e) => setNameLast(e.target.value)} sx={{ input: { color: "white" }, label: { color: "white" } }} />
            <TextField label="Email" type="email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} sx={{ input: { color: "white" }, label: { color: "white" } }} />
            <TextField label="Password" type="password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} sx={{ input: { color: "white" }, label: { color: "white" } }} />
            <TextField label="Confirm Password" type="password" fullWidth value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} sx={{ input: { color: "white" }, label: { color: "white" } }} />
            
            <div className={styles.actions}>
                <Button type='submit' variant="contained" disabled={loading} fullWidth>
                    {loading
                        ? <CircularProgress size={24} color="inherit" />
                        : "Register"
                    }
                </Button>
                <Typography variant="body2" className={styles.footerLink}>
                    Have an account? <Link to='/Login'>Login</Link>
                </Typography>
            </div>
        </Box>
    </div>
  );
}

export default Register;