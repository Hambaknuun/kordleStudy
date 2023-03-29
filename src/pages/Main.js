import Header from "../components/Header";
import Input from "../components/Input";
import Keyboard from "../components/Keyboard";
import { useEffect, useState, useCallback } from "react";
import {
  checkAndCreateGameState,
  convertKeyToHangul,
  enterGuess,
} from "../utils/vocab";

const Main = ({ todayAnswer }) => {
  const maxTrialCount = 6;
  const [currentGuess, setCurrentGuess] = useState([]);
  const [guesses, setGuesses] = useState([]);

  const onChangeUserInput = useCallback(
    (key) => {
      if (!key) return;
      else if (key === "Backspace")
        setCurrentGuess((prev) =>
          [...prev].filter((it, idx) => {
            return idx !== prev.length - 1 ? true : false;
          })
        );
      else if (key === "Enter") {
        setGuesses((prev) => [...prev, currentGuess]);
        setCurrentGuess([]);
        // const guessResult = enterGuess(currentGuess, todayAnswer);
        // console.log("Enter!", guessResult);
        // handleGuessResult(currentGuess);
      } else {
        setCurrentGuess((prev) => {
          return prev.length !== 6 ? [...prev, key] : [...prev];
        });
      }
    },
    [currentGuess, todayAnswer]
  );

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
    console.log("guess", currentGuess);
  }, [currentGuess]);

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);
    checkAndCreateGameState();
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyUp]);

  const rendering = () => {
    const result = [];
    for (let i = 1; i < maxTrialCount - guesses.length; i++) {
      result.push(<Input guess={[]} status={"future"} />);
    }
    return result;
  };

  return (
    <div className="playBoard">
      <Header />
      {guesses.map((it) => {
        return <Input guess={it} status={"past"} />;
      })}
      <Input guess={currentGuess} status={"current"} />
      {rendering()}
      <Keyboard />
    </div>
  );
};

export default Main;
