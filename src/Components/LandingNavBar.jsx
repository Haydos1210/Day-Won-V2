import styles from './Navbar.module.css'
import HomeIcon from '@mui/icons-material/Home';
import iconStyles from '../auth/EditPresentation.module.css'
import IconButton from '@mui/material/IconButton';


function Navbar({onClickHome}) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarTitleContainer}>
        <h2 className={styles.navbarTitle} onClick={onClickHome}>
          Presto
        </h2>
      </div>

      <IconButton
        onClick={onClickHome}
        aria-label="Redirects back to dashboard"
        disableRipple
      >
        <HomeIcon className={iconStyles.createElementIcons} fontSize="large"/>
      </IconButton>
    </nav>
  );
}

export default Navbar