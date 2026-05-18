interface User {
    userId: number,
    nameFirst: string,
    nameLast: string,
    email: string,
    password: string,
    numSuccessfulLogins: number,
    numFailedPasswordsSinceLastLogin: number
    // userSession: string[];
    passwordHistory: string[];
}

interface Deck {
    cards: Card[],
    deckId: number
}


interface Card {
    question: string,
    answer:string,
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
    decks: Deck[]
}

export {
    Data,
    User,
};