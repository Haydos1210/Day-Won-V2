// Creating and editing card endpoints
    // i.e. recieving HTTP requests, modifying storage, and returning a response
// REST Architecture
    // PUT - edit
    // POST - create
    // GET - retrieve
    // DELETE - remove
// HTTP Status Codes
    // 200 - ok
    // 201 - created
    // 202 - accepted (like 201 but not technically created yet)
    // 400 - bad request
    // 401 - unauthorised (invalid token)
    // 403 - forbidden (valid token, but lack permission for this task)
    // 404 - not found

import { Router } from 'express';
import type { Request, Response } from 'express';
import { getData, saveDataToFile } from '../data/dataStore.ts';
import { authed } from './auth.ts';

const router = Router();

/*
    Finds the next cardId through simple arithmetic increment within a deck
    Prevents duplicate IDs, but assumes the following:
        cardIds are not unique across decks (cardIds are local i.e. multiple decks can have a card with cardId of value '1' or '2' etc.)
        cardIds are non encrypted as they are not considered sensitive data and are simply identfiers
*/
function getNextCardId(cards: { cardId: number }[]) {
    if (cards.length === 0) return 1;
    return Math.max(...cards.map(card => card.cardId)) + 1; // prevent duplicate ID
}

/*
    Identifies if the person trying to access or perform an operation on a deck is an owner.
*/
function isDeckOwner(req: Request, res:Response, deck: { ownerId: number }) {
    const user = (req as any).user;
    if (deck.ownerId !== user.userId) {
        res.status(403).json({ error: "You do not own this deck!" });
        return false;
    } else {
        return true;
    }
}

/*
    Creates a new card inside of a deck, stores card and passes newCard to persistent dataStore.
*/
router.post('/decks/:deckId/cards', authed(async (req: Request, res: Response) => {
    const deckId = Number(req.params.deckId);
    const { question, answer } = req.body;

    if (!question || !answer) return res.status(400).json({ error: 'Question and answer are required!' });

    const data = getData();
    const deck = data.decks.find(currDeck => currDeck.deckId === deckId);
    if (!deck) return res.status(404).json({ error: 'Deck not found!' });
    if (!isDeckOwner(req, res, deck)) return;

    const newCard = {
        cardId: getNextCardId(deck.cards),
        question,
        answer
    };

    deck.cards.push(newCard);
    saveDataToFile(data);

    return res.status(201).json({ card: newCard });
}));

/*
    Edit a card inside of a deck, stores new card updated fields (if they are defined), and passes updated card to persistent dataStore.
*/
router.put('/decks/:deckId/cards/:cardId', authed(async (req: Request, res: Response) => {
    const deckId = Number(req.params.deckId);
    const cardId = Number(req.params.cardId);
    const { question, answer } = req.body;

    const data = getData();
    const deck = data.decks.find(currDeck => currDeck.deckId === deckId);
    if (!deck) return res.status(404).json({ error: 'Deck not found!' });
    if (!isDeckOwner(req, res, deck)) return;

    const card = deck.cards.find(currCard => currCard.cardId === cardId);
    if (!card) return res.status(404).json({ error: 'Card not found!' });

    if (question !== undefined) {
        card.question = question;
    }

    if (answer !== undefined) {
        card.answer = answer;
    }

    saveDataToFile(data);

    return res.status(200).json({ card });
}));

/*
    Deletes a card from a deck.
*/
router.delete('/decks/:deckId/cards/:cardId', authed( async (req: Request, res: Response) => {
    const deckId = Number(req.params.deckId);
    const cardId = Number(req.params.cardId);

    const data = getData();
    const deck = data.decks.find(currDeck => currDeck.deckId === deckId);
    if (!deck) return res.status(404).json({ error: 'Deck not found!' });
    if (!isDeckOwner(req, res, deck)) return;

    const card = deck.cards.findIndex(currCard => currCard.cardId === cardId); // find Index, not card itself
    if (card === -1) return res.status(404).json({ error: 'Card not found!' }); // findIndex can return -1

    const removedCard = deck.cards[card];
    deck.cards.splice(card, 1); // mutate cards array by removing inplace the card at index 'card'

    saveDataToFile(data);

    return res.status(200).json({ card: removedCard });
}));

/*
    Retrieves a card from a deck
*/
router.get('/decks/:deckId/cards/:cardId', authed(async (req: Request, res: Response) => {
    const deckId = Number(req.params.deckId);
    const cardId = Number(req.params.cardId);

    const data = getData();
    const deck = data.decks.find(currDeck => currDeck.deckId === deckId);
    if (!deck) return res.status(404).json({ error: 'Deck not found!' });
    if (!isDeckOwner(req, res, deck)) return;

    const card = deck.cards.find(currCard => currCard.cardId === cardId); // find Index, not card itself
    if (!card) return res.status(404).json({ error: 'Card not found!' }); // findIndex can return -1

    return res.status(200).json({ card });
}));

export default router;