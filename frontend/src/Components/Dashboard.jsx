import styles from './Dashboard.module.css'
import { Button } from '@mui/material';

function Dashboard() {
  return (
    <>
      <div className={styles.dashboardContainer}>
        <div className={styles.dashboardNavBar}>
            {/* add more nav bar navigatin buttons here */}
        </div>
        <div className={styles.dashboardMainContent}>
            <span className={styles.mainTitle}>Flash Card Decks</span>
        </div>
      </div>
    </>
  );
}

export default Dashboard;