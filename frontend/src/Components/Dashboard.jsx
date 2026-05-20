import { useEffect, useState } from 'react';
import styles from './Dashboard.module.css'
import { useNavigate } from 'react-router-dom';
import { Button, Box, IconButton } from '@mui/material';
import DeckCard from './DeckCard';
import DayOneLogo from './DayOneLogo';
import PersonIcon from '@mui/icons-material/Person';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import TimerIcon from '@mui/icons-material/Timer';
import Profile from './Profile';

function Dashboard() {
  const navigate = useNavigate();
  const [decks, setDecks] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const loadDecks = async () => {
      if (!token) return;

      const res = await fetch('http://localhost:5500/decks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) return;

      const data = await res.json();
      setDecks(data.decks || []);
    };

    loadDecks();
  }, [token]);

  const handleCreateDeck = async () => {
    if (!token) return;

    const res = await fetch('http://localhost:5500/decks', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) return;

    const data = await res.json();
    setDecks((prev) => [...prev, data.deck]);
  };

  return (
    <>
      <Box className={styles.dashboardContainer}>
        <Box className={styles.dashboardNavBar}>
          <Box className={styles.navItem} onClick={() => navigate('/Profile')}>
            <PersonIcon sx={{ color: 'white', fontSize: 50 }}/>
          </Box>

          <Box className={styles.navItem}>
            <LibraryBooksIcon sx={{ color: 'white', fontSize: 50 }} />
          </Box>

          <Box className={styles.navItem}>
            <TimerIcon sx={{ color: 'white', fontSize: 50 }} />
          </Box>
        </Box>
        <Box className={styles.dashboardMainContent}>
            <div className={styles.topBar}>
              <span className={styles.mainTitle}>Flash Card Decks</span>
              <Button variant="contained" onClick={handleCreateDeck}>
                Create Deck
              </Button>
            </div>

            <div className={styles.deckGrid}>
              {decks.map((deck) => (
                <DeckCard key={deck.deckId} deck={deck} />
              ))}
            </div>
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;