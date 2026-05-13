import styles from './TopNavbar.module.css'
// import HomeIcon from '@mui/icons-material/Home';
// import iconStyles from '../auth/EditPresentation.module.css'
// import IconButton from '@mui/material/IconButton';
import DayOneLogo from './DayOneLogo';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';


function LandingNavbar() {
  return (
    <nav className={styles.navbar}>
      <DayOneLogo/>
      <div className={styles.landingNavAuthContainer}>
        <Link to='/Login'>
          <Button variant="contained">Login</Button>
        </Link>
        <Link to='/Register'>
          <Button variant="contained">Register</Button>
        </Link> 
      </div>
      {/* <div className={styles.navbarLogoContainer}>
        <DayOneLogo/>
        <h2 className={styles.navbarTitle}>
          Presto
        </h2>
      </div> */}

      {/* <IconButton
        onClick={onClickHome}
        aria-label="Redirects back to dashboard"
        disableRipple
      >
        <HomeIcon className={iconStyles.createElementIcons} fontSize="large"/>
      </IconButton> */}
    </nav>
  );
}

export default LandingNavbar