export const initialState = {
  currentGuess: [],
  isCorrect: false,
  EZMode: false,
  guesses: [],
};

export function reducer(state, action) {
  switch (action.type) {
    case "BACKSPACE":
      return {
        ...state,
        currentGuess: state.currentGuess.filter((it, idx) => {
          return idx !== state.currentGuess.length - 1 ? true : false;
        }),
      };
    case "INITIALIZE_CURRENT":
      return { ...state, currentGuess: [] };
    case "KEY_INPUT":
      return {
        ...state,
        currentGuess:
          state.currentGuess.length !== 6
            ? [...state.currentGuess, action.key]
            : [...state.currentGuess],
      };
    case "CORRECT":
      return { ...state, isCorrect: true };
    case "TOGGLE_MODE":
      return { ...state, EZMode: !state.EZMode };
    case "INSERT_GUESSES":
      return {
        ...state,
        guesses: [...state.guesses, state.currentGuess],
      };
    case "SPLICE_GUESSES":
      return {
        ...state,
        guesses:
          state.guesses.length >= 6
            ? [...state.guesses, state.currentGuess.splice(1)]
            : [...state.guesses],
      };
    case "INITIALIZE_GUESSES_LOCALSTORAGE":
      return {
        ...state,
        guesses: action.data?.guesses,
        EZMode: action.data?.mode === "HARD" ? false : true,
      };
    default:
      return;
  }
}
