import { useEffect, useState } from 'react';
import styles from './Dashboard.module.css'
import { useNavigate } from 'react-router-dom';
import { Button, Box, IconButton, CircularProgress, Alert, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import DeckCard from './DeckCard';
import DayOneLogo from './DayOneLogo';
import PersonIcon from '@mui/icons-material/Person';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import TimerIcon from '@mui/icons-material/Timer';
import Profile from './Profile';

function Dashboard() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [creatingDeck, setCreatingDeck] = useState(false);
  const [deckName, setDeckName] = useState('');
  const [deckDesc, setDeckDesc] = useState('');
  
  useEffect(() => {
    const loadDecks = async () => {
      if (!token) {
        navigate('/Login');
        return;
      }

      setLoading(true);
      setError('');

      try {
        const res = await fetch('http://localhost:5500/decks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          localStorage.removeItem('token');
          navigate('/Login');
          return;
        }

        if (!res.ok) {
          setError('Error: failed to load decks!');
          return;
        }

        const data = await res.json();
        setDecks(data.decks || []);
      } catch {
        setError('Error: network error');
      } finally {
        setLoading(false);
      }
    };

    loadDecks();
  }, [navigate]);

  const handleCreateDeck = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    // const name = prompt('Name:') || '';
    // const desc = prompt('Description:') || '';

    const res = await fetch('http://localhost:5500/decks', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        name: deckName,
        desc: deckDesc
      }),
    });

    if (!res.ok) return;

    const data = await res.json();
    setDecks((prev) => [...prev, data.deck]);
    setDeckName('');
    setDeckDesc('');
    setCreatingDeck(false);
  };

  const handleCancel = async () => {
    setCreatingDeck(false);
    setDeckName('');
    setDeckDesc('');
  }

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
              <Button variant="contained" onClick={() => setCreatingDeck(true)}>
                Create Deck
              </Button>
            </div>

            {error && (
                <Alert
                severity="error"
                onClose={() => setError('')}
                >
                    {error}
                </Alert>
            )}

            <div className={styles.deckGrid}>
              {[...decks].slice().reverse().map((deck) => (
                <DeckCard key={deck.deckId} deck={deck} />
              ))}

              <div className={styles.addDeckCard} onClick={() => setCreatingDeck(true)} role="button" tabIndex={0}>
                <div className={styles.addDeckIcon}>+</div>
                <div className={styles.addDeckText}>Add Deck</div>
              </div>
            </div>
        </Box>
      </Box>

      <Dialog open={creatingDeck} onClose={() => setCreatingDeck(false)} slotProps={{ paper: { sx: { backgroundColor: '#121212', color: 'white' } } }} fullWidth>
        <DialogTitle sx={{ color: 'white', borderBottom: '1px solid #1a1a1a' }}>Create Deck</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Deck Name" value={deckName} onChange={(e) => setDeckName(e.target.value)} InputLabelProps={{ style: { color: "white" } }}
  sx={{
    "& .MuiInputBase-input": {
      color: "white",
    },
  }} />
          <TextField label="Description" value={deckDesc} onChange={(e) => setDeckDesc(e.target.value)} multiline minRows={2} InputLabelProps={{ style: { color: "white" } }}
  sx={{
    "& .MuiInputBase-input": {
      color: "white",
    },
  }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateDeck}>Save Deck</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Dashboard;