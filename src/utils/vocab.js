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

    const vocabArr = Hangul.disassemble(VOCAB[index]);
    return vocabArr;
};

export const todayAnswer = getVocabByDate(new Date());

export const getTodayAnswerAssembled = () => {
    return Hangul.assemble(todayAnswer);
};
// checkGameState
export const checkAndCreateGameState = () => {
    let createFlag = false;
    if (
        !localStorage.getItem("gameState") ||
        JSON.parse(localStorage.getItem("gameState"))["guesses"].length === 0
    ) {
        // 1. 게임 최초 접속인 경우
        createFlag = true;
    } else {
        const curGameState = JSON.parse(localStorage.getItem("gameState"));
        const curSolution = Hangul.assemble(curGameState.solution);
        // 2. 문제 갱신이 필요한 경우
        if (curSolution !== Hangul.assemble(todayAnswer)) {
            createFlag = true;
        }
    }

    if (createFlag) createGameState(todayAnswer);
};

// Create New Game State (Local Storage)
export const createGameState = (todayVocab) => {
    const solution = Hangul.disassemble(todayVocab);
    const newGameState = { guesses: [], solution: solution };
    localStorage.setItem("gameState", JSON.stringify(newGameState));
};

const getLocalGameState = () => {
    const localGameState = JSON.parse(localStorage.getItem("gameState"));

    if (!localGameState) return null;
    return localGameState;
};

export const enterGuess = (guess) => {
    if (!guess || guess.length < 6) return "NOT_ENOUGH";

    let resultType = "CORRECT";
    const localGameState = getLocalGameState();
    const localAnswer = localGameState ? localGameState.solution : todayAnswer;
    guess.map((it, idx) => {
        if (it !== localAnswer[idx]) resultType = "WRONG";
    });

    return resultType;
};

export const getGuessResult = (guess) => {
    const localGameState = getLocalGameState();
    const localAnswer = localGameState ? localGameState.solution : todayAnswer;
    const countAnswer = localAnswer.reduce((accu, curr) => {
        accu[curr] = (accu[curr] || 0) + 1;
        return accu;
    }, {});

    let result = guess.map((it, idx) => {
        if (it === localAnswer[idx]) {
            countAnswer[it] -= 1;
            return { value: guess[idx], status: "correct" };
        } else {
            return { value: guess[idx], status: "absent" };
        }
    });

    result.map((it, idx) => {
        if (
            it.status === "absent" &&
            countAnswer[it.value] > 0 &&
            localAnswer.includes(it.value)
        ) {
            countAnswer[it.value] -= 1;
            it.status = "present";
        }
    });

    return result;
};

export const getGuessResults = (guesses) => {
    if (!guesses) return [];

    return guesses.map((guess) => {
        return getGuessResult(guess);
    });
};

export const getkeyResults = (guesses) => {
    if (!guesses) return {};

    const guessResults = getGuessResults(guesses);
    const keyResults = {};
    if (guessResults && guessResults.length > 0) {
        guessResults.map((guess, i) => {
            guess.map((it, j) => {
                if (it.value in keyResults) {
                    if (it.status !== keyResults[it.value]) {
                        if (
                            it.status === "correct" &&
                            keyResults[it.value] !== "correct"
                        ) {
                            console.log("correct" + i + ", " + j, it);
                            keyResults[it.value] = it.status;
                        } else if (
                            it.status === "present" &&
                            keyResults[it.value] === "absent"
                        ) {
                            console.log("present" + i + ", " + j, it);
                            keyResults[it.value] = it.status;
                        }
                    }
                } else {
                    console.log("new" + i + ", " + j, it);
                    keyResults[it.value] = it.status;
                }
            });
        });
    }

    return keyResults;
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
