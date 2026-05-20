interface User {
    userId: number,
    nameFirst: string,
    nameLast: string,
    email: string,
    password: string,
    numSuccessfulLogins: number,
    numFailedPasswordsSinceLastLogin: number
    passwordHistory: string[];
}

interface Session {
    nameFirst: string,
    userId: number
}

interface Deck {
    ownerId: number,
    deckId: number,
    name: string,
    desc: string,
    cards: Card[]
}


interface Card {
    question: string,
    answer: string,
    cardId: number
}

// interface Quizzes {
//     userId: number,
//     quizId: number,
//     name: string,
//     description: string,
//     timeCreated: number,
//     timeLastEdited: number,
// }

// interface Timers {
//     // userId: number,
//     // timerId: number,
//     // timerName: string,
//     // timerHrs: number,
//     // timerMins: number,
//     remainingTimeHrs: number,
//     remainingTimeMins: number,
//     remainingTimeSecs: number
// }

interface Data {
    users: User[],
    decks: Deck[],
    // Record<string, Session> means: "an object where every key is a string (the UUID token) and every value is a Session.
    sessions: Record<string, Session>
}

export {
    Data,
    User,
    Session
};