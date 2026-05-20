import { Link } from 'react-router-dom';
import styles from './Landing.module.css'
import { Button } from '@mui/material';
import LandingNavbar from '../Components/LandingNavBar';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function Landing() {
  return (
    <>
      <div className={styles.landingContainer}>
        <LandingNavbar/>
        
        <div className={styles.landingBodyContainer}>
          <div className={styles.landingPageSloganContainer}>
            <h1 className={styles.landingPageSlogan}>One day. Or day one.</h1>
          </div>
          <div>
            <Button variant="contained" endIcon={<ArrowForwardIcon />}>
              Sign up for free
            </Button>
          </div>
          <div className={styles.landingPageInfoBoxesContainer}>
            <div className={styles.landingPageInfoBox}>
              <div className={styles.landingPageInfoBoxContentContainer}>
                <p className={styles.landingPageInfoBoxTitle}>Timers</p>
                <div className={styles.landingPageInfoBoxDividingLine}></div>
                <p className={styles.landingPageInfoBoxBodyText}>
                  Keep track of the grind with tracked progress and setting goal targets
                </p>
              </div>
            </div>
            <div className={styles.landingPageInfoBox}>
              <div className={styles.landingPageInfoBoxContentContainer}>
                <p className={styles.landingPageInfoBoxTitle}>Flashcards</p>
                <div className={styles.landingPageInfoBoxDividingLine}></div>
                <p className={styles.landingPageInfoBoxBodyText}>
                  wdwd
                </p>
              </div>
            </div>
            <div className={styles.landingPageInfoBox}>
              <div className={styles.landingPageInfoBoxContentContainer}>
                <p className={styles.landingPageInfoBoxTitle}>Avatar</p>
                <div className={styles.landingPageInfoBoxDividingLine}></div>
                <p className={styles.landingPageInfoBoxBodyText}>
                  wdwd
                </p>
              </div>
            </div>
          </div>
        </div>

        
        
      </div>

      <footer className="footer">
        <p>© 2026 My Website</p>
      </footer>
    </>
  );
}

export default Landing;