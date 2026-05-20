// Creating and editing deck endpoints
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
import { getData, saveDataToFile } from './dataStore.ts';
import { authed } from './auth.ts';

const router = Router();

/*
    Finds the next deckId through simple arithmetic increment
*/
function getNextDeckId(decks: { deckId: number }[]) {
    if (decks.length === 0) return 1;
    return Math.max(...decks.map(deck => deck.deckId)) + 1; // prevent duplicate ID
}

/*
    Creates a new deck, stores it and passes newdeck to persistent dataStore.
*/
router.post('/decks', authed(async (req: Request, res: Response) => {
    const data = getData();

    const newDeck = {
        deckId: getNextDeckId(data.decks),
        cards: []
    };

    data.decks.push(newDeck);
    saveDataToFile(data);

    return res.status(201).json({ deck: newDeck });
}));

/*
    Edit a deck, stores new deck updated fields (if they are defined), and passes updated deck to persistent dataStore.
    currently not implemented as deck does not have fields to update
*/
// router.put('/decks/:deckId/decks/:deckId', authed(async (req: Request, res: Response) => {
    

//     saveDataToFile(data);

//     return res.status(200).json({ deck });
// }));

/*
    Deletes a deck
*/
router.delete('/decks/:deckId', authed( async (req: Request, res: Response) => {
    const deckId = Number(req.params.deckId);

    const data = getData();
    const deckIndex = data.decks.findIndex(currDeck => currDeck.deckId === deckId);
    if (deckIndex === -1) return res.status(404).json({ error: 'Deck not found!' });

    const removedDeck = data.decks[deckIndex];
    data.decks.splice(deckIndex, 1); // mutate decks array by removing inplace the deck at index 'deck'

    saveDataToFile(data);

    return res.status(200).json({ deck: removedDeck });
}));

/*
    Retrieves a deck
*/
router.get('/decks/:deckId', authed(async (req: Request, res: Response) => {
    const deckId = Number(req.params.deckId);

    const data = getData();
    const deck = data.decks.find(currDeck => currDeck.deckId === deckId);
    if (!deck) return res.status(404).json({ error: 'Deck not found!' });

    return res.status(200).json({ deck });
}));

export default router;
