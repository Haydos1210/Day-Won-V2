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
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const register = async (e) => {
        e.preventDefault();

        if (!name || !email || !password || !confirmPassword) {
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
            if (authenticate) authenticate();
        } catch (err) {
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
            <TextField label="Name" fillWidth value={name} onChange={(e) => setName(e.target.value)} sx={{ input: { color: "white" }, label: { color: "white" } }} />
            <TextField label="Email" type="email" fillWidth value={email} onChange={(e) => setEmail(e.target.value)} sx={{ input: { color: "white" }, label: { color: "white" } }} />
            <TextField label="Password" type="password" fillWidth value={password} onChange={(e) => setPassword(e.target.value)} sx={{ input: { color: "white" }, label: { color: "white" } }} />
            <TextField label="Confirm Password" type="password" fillWidth value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} sx={{ input: { color: "white" }, label: { color: "white" } }} />
            
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