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

import express from 'express';
import cors from 'cors';
import { Router, Request, Response } from 'express';
import { getData, saveDataToFile } from './dataStore.ts';

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
    Creates a new card inside of a deck, stores card and passes newCard to persistent dataStore
*/
router.post('/decks/:deckId/cards', (req: Request, res: Response) => {
    const deckId = Number(req.params.deckId);
    const { question, answer } = req.body;

    if (!question || !answer) return res.status(400).json({ error: 'Question and answer are required!' });

    const data = getData();
    const deck = data.decks.find(currDeck => currDeck.deckId === deckId);
    if (!deck) return res.status(404).json({ error: 'Deck not found!' });

    const newCard = {
        cardId: getNextCardId(deck.cards),
        question,
        answer
    };

    deck.cards.push(newCard);
    saveDataToFile(data);

    return res.status(201).json({ card: newCard });
});

export default router;