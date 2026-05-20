import styles from './Dashboard.module.css'
import { useNavigate } from 'react-router-dom';
import { Box, IconButton } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import TimerIcon from '@mui/icons-material/Timer';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';

function Profile() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem('token');

    try {
      await axios.post(
        'http://localhost:5500/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error('Logout failed', err);
    } finally {
      localStorage.removeItem('token');
      navigate('/');
    }
  };

  return (
  <>
    <Box className={styles.dashboardContainer}>
      <Box className={styles.dashboardNavBar}>
        <Box className={styles.navItem}>
          <PersonIcon sx={{ color: 'white', fontSize: 50 }} />
        </Box>

        <Box className={styles.navItem} onClick={() => navigate('/Dashboard')}>
          <LibraryBooksIcon sx={{ color: 'white', fontSize: 50 }} />
        </Box>

        <Box className={styles.navItem}>
          <TimerIcon sx={{ color: 'white', fontSize: 50 }} />
        </Box>
      </Box>

      <Box className={styles.dashboardMainContent}>
        <Box className={styles.topBar}>
          <span className={styles.mainTitle}>Profile</span>

          <IconButton className={styles.logoutButton} onClick={handleLogout}>
            <LogoutIcon sx={{ color: 'white', fontSize: 35 }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  </>
  );
}

export default Profile;