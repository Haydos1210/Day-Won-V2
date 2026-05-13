import { Link } from 'react-router-dom';
import styles from './Landing.module.css'
import { Button } from '@mui/material';
import LandingNavbar from '../Components/LandingNavBar';

function Landing() {
  return (
    <>
      <div className={styles.landingContainer}>
        <LandingNavbar/>
        
        <div className={styles.landingBodyContainer}>
          <h1 className={styles.title}>Presto</h1>
          <p className={styles.subtitle}>Visualise. Create. Present.</p>
          <div className={styles.buttonRow}>
            <Link to='/Login'>
              <Button variant="contained">Login</Button>
            </Link>
            <Link to='/Register'>
              <Button variant="contained">Register</Button>
            </Link> 
          </div>
        </div>
        
      </div>
    </>
  );
}

export default Landing;