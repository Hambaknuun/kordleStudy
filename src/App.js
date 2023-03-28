import { useEffect, useState, useCallback } from "react";
import "./App.css";
import Main from "./pages/Main";
import {
  getVocabByDate,
  checkAndCreateGameState,
  convertKeyToHangul,
  enterGuess,
} from "./utils/vocab";

function App() {
  const todayAnswer = getVocabByDate(new Date());
  const [guess, setGuess] = useState([]);

  const onChangeUserInput = useCallback(
    (key) => {
      if (!key) return;
      else if (key === "Backspace")
        setGuess((prev) =>
          [...prev].filter((it, idx) => {
            return idx !== prev.length - 1 ? true : false;
          })
        );
      else if (key === "Enter") {
        const guessResult = enterGuess(guess, todayAnswer);
        handleGuessResult(guessResult);
        console.log("Enter!", guessResult);
      } else {
        setGuess((prev) => {
          return prev.length !== 6 ? [...prev, key] : [...prev];
        });
      }
    },
    [guess, todayAnswer]
  );

  const handleGuessResult = (guessResult) => {
    const type = guessResult?.type;
    switch (type) {
      case "NOT_ENOUGH":
        alert("음운이 부족합니다.");
        break;
      case "WRONG":
        alert("틀렸습니다! 다시 시도 해보세요");
        break;
      case "CORRECT":
        alert("정답입니다! 축하드립니다!");
        break;
      default:
        break;
    }
  };

  const handleKeyUp = useCallback(
    (event) => {
      console.log(event.key + " key was pressed!");

      if (convertKeyToHangul(event.key)) {
        onChangeUserInput(convertKeyToHangul(event.key));
      }
    },
    [onChangeUserInput]
  );

  useEffect(() => {
    console.log("todayAnswer", todayAnswer);
  }, [todayAnswer]);

  useEffect(() => {
    console.log("guess", guess);
  }, [guess]);

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);
    checkAndCreateGameState();
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyUp]);

  return (
    <div className="App">
      <Main guess={guess} />
    </div>
  );
}

export default App;
