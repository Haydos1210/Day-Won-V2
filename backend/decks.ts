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

import express from 'express';
import cors from 'cors';
import { Router, Request, Response } from 'express';
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
    Creates a new deck, stores it and passes newdeck to persistent dataStore.
*/
router.post('/decks', authed(async (req: Request, res: Response) => {
    const { name, desc } = req.body;
    const data = getData();
    const user = (req as any).user;

    const newDeck = {
        ownerId: user.userId,
        deckId: getNextDeckId(data.decks),
        name: name || `Deck ${data.decks.length + 1}`, // either a given name or the default being 'Deck No.'
        desc: desc || '', // either a given description or blank by default
        cards: []
    };

    data.decks.push(newDeck);
    saveDataToFile(data);

    return res.status(201).json({ deck: newDeck });
}));

/*
    Edit a deck, stores new deck updated fields (if they are defined), and passes updated deck to persistent dataStore.
    Note that this route does NOT handle cards. it handles editing deck name and description
    Editing/Deleting cards is under the cards routes and is not considered 'editing the deck'
*/
router.put('/decks/:deckId', authed(async (req: Request, res: Response) => {
    const deckId = Number(req.params.deckId);
    const { name, desc } = req.body;
    const data = getData();
    
    const deck = data.decks.find(currDeck => currDeck.deckId === deckId);
    if (!deck) return res.status(404).json({ error: 'Deck not found!' });
    if (!isDeckOwner(req, res, deck)) return;

    if (name !== undefined) deck.name = name;
    if (desc !== undefined) deck.deck = deck;

    saveDataToFile(data);

    return res.status(200).json({ deck });
}));

/*
    Deletes a deck
*/
router.delete('/decks/:deckId', authed( async (req: Request, res: Response) => {
    const deckId = Number(req.params.deckId);

    const data = getData();
    const deckIndex = data.decks.findIndex(currDeck => currDeck.deckId === deckId);
    if (deckIndex === -1) return res.status(404).json({ error: 'Deck not found!' });
    
    if (!isDeckOwner(req, res, deck)) return;

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
    if (!isDeckOwner(req, res, deck)) return;

    return res.status(200).json({ deck });
}));

/*
    Retrieves ALL decks. Used for the dashboard display
*/
router.get('/decks', authed(async (req: Request, res: Response) => {
    const data = getData();
    const user = (req as any).user;
    const decks = data.decks.filter(owner => owner.ownerId === user.userId);
    return res.status(200).json({ decks });
}));


export default router;
