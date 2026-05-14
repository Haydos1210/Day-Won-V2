import styles from './Dashboard.module.css'
import { Button, Box, IconButton } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import TimerIcon from '@mui/icons-material/Timer';
import DayOneLogo from './DayOneLogo';

function Dashboard() {
  return (
    <>
      <Box className={styles.dashboardContainer}>
        <Box className={styles.dashboardNavBar}>
          <Box className={styles.navItem}>
            <PersonIcon sx={{ color: 'white', fontSize: 50 }} />
          </Box>

          <Box className={styles.navItem}>
            <LibraryBooksIcon sx={{ color: 'white', fontSize: 50 }} />
          </Box>

          <Box className={styles.navItem}>
            <TimerIcon sx={{ color: 'white', fontSize: 50 }} />
          </Box>
        </Box>
        <Box className={styles.dashboardMainContent}>
            <span className={styles.mainTitle}>Flash Card Decks</span>
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;