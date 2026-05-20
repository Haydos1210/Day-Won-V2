import { useNavigate } from 'react-router-dom';
import styles from './DeckCard.module.css';

function DeckCard({ deck }) {
  const navigate = useNavigate();

  return (
    <div
      className={styles.card}
      onClick={() => navigate(`/decks/${deck.deckId}`)}
      role="button"
      tabIndex={0}
      style={{ cursor: 'pointer' }}
    >
      <div className={styles.thumbnail}>
        <span className={styles.count}>{deck.cards.length}</span>
      </div>

      <div className={styles.content}>
        <strong className={styles.title}>Deck {deck.deckId}</strong>
        <span className={styles.meta}>{deck.cards.length} card(s)</span>
      </div>
    </div>
  );
}

export default DeckCard;