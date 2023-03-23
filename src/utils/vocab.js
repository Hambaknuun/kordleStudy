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

export const convertKeyToHangul = (key) => {
  // key 값에 따라 한글로 변환
  switch (key) {
    case "a":
      return "ㅁ";
    case "b":
      return "ㅠ";
    case "c":
      return "ㅊ";
    case "d":
      return "ㅇ";
    case "e":
      return "ㄷ";
    case "f":
      return "ㄹ";
    case "g":
      return "ㅎ";
    case "h":
      return "ㅗ";
    case "i":
      return "ㅑ";
    case "j":
      return "ㅓ";
    case "k":
      return "ㅏ";
    case "l":
      return "ㅣ";
    case "m":
      return "ㅡ";
    case "n":
      return "ㅜ";
    case "o":
      return "";
    case "p":
      return "";
    case "q":
      return "ㅂ";
    case "r":
      return "ㄱ";
    case "s":
      return "ㄴ";
    case "t":
      return "ㅅ";
    case "u":
      return "ㅕ";
    case "v":
      return "ㅍ";
    case "w":
      return "ㅈ";
    case "x":
      return "ㅌ";
    case "y":
      return "ㅛ";
    case "z":
      return "ㅋ";
    case "Backspace":
      return "Backspace";
    case "Enter":
      return "Enter";
    default:
      return "";
  }
};
