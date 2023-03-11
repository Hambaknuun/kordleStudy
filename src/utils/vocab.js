import * as Hangul from "hangul-js";

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

  // const vocabArr = Hangul.disassemble(VOCAB[index]);
  return VOCAB[index];
};

// checkGameState
export const checkAndCreateGameState = () => {
  let createFlag = false;
  if (!localStorage.getItem("gameState")) {
    // 1. 게임 최초 접속인 경우
    createFlag = true;
  } else {
    const curGameState = JSON.parse(localStorage.getItem("gameState"));
    const curSolution = Hangul.assemble(curGameState.solution);
    // 2. 문제 갱신이 필요한 경우
    if (curSolution !== getVocabByDate(new Date())) createFlag = true;
  }

  if (createFlag) createGameState(getVocabByDate(new Date()));
};

// Create New Game State (Local Storage)
export const createGameState = (todayVocab) => {
  const solution = Hangul.disassemble(todayVocab);
  const newGameState = { guesses: [], solution: solution };

  localStorage.setItem("gameState", JSON.stringify(newGameState));
};
