export const ALPHABET_SCORE_MAP = {
    A: 1,
    B: 3,
    C: 3,
    D: 2,
    E: 1,
    F: 4,
    G: 2,
    H: 4,
    I: 1,
    J: 8,
    K: 6,
    L: 1,
    M: 3,
    N: 1,
    O: 1,
    P: 3,
    Q: 10,
    R: 1,
    S: 1,
    T: 1,
    U: 1,
    V: 4,
    W: 4,
    X: 8,
    Y: 4,
    Z: 10
};

export const HTTPSTATUS = {
    OK: 200,
    NOTFOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500
}

export const API_ERRORS = {
    WORD_EXISTS: 'Word already exists, save not successful.',
    INTERNAL_SERVER_ERROR: 'Internal Server Error.'
}

export const TABLE_ROLES = {
    COLUMN_HEADER: 'columnheader'
}

export const LABELS = {
    WELCOME_TEXT: 'Welcome! Please type a word in the field below to begin!',
    WORD_INPUT_PLACEHOLDER_TEXT: 'Score will only be computed when you type a valid word',
    SCORE_SAVED_TEXT: 'Your score has been saved!',
    WORD_ALREADY_EXISTS_TEXT: `Sorry, your word already exists in the database and we won't save duplicates :(`,
    WORD_INVALID_TEXT: 'The word you typed is invalid, please try another word!',
    TOP_TEN_SCORES_TITLE: 'Top 10 Scores'
}