const VOCAB = [
  "공짜",
  "등산",
  "목숨",
  "비디오",
  "생각",
  "서비스",
  "아파트",
  "절반",
  "평균",
  "항복",
];

// Get today's vocab randomly (disassemble)
export const getVocabByDate = (date) => {
  const dateStr = `${date.getFullYear()}${
    date.getMonth() + 1
  }${date.getDate()}`;

  const index = dateStr % VOCAB.length;

  return VOCAB[index];
};

// Create New Game State (Local Storage)
export const createGameState = () => {
  const solution = [];

  const newGameState = { guesses: [], solution: solution };
  localStorage.setItem("gameState", JSON.stringify(newGameState));
};
