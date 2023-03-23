import { useEffect, useState, useCallback } from "react";
import "./App.css";
import Main from "./pages/Main";
import {
  getVocabByDate,
  checkAndCreateGameState,
  convertKeyToHangul,
} from "./utils/vocab";

function App() {
  const todayAnswer = getVocabByDate(new Date());
  const [userInput, setUserInput] = useState();
  const [guess, setGuess] = useState([]);

  const handleKeyDown = (event) => {
    console.log(event.key + " key was pressed!");

    if (convertKeyToHangul(event.key)){
      onChangeUserInput(convertKeyToHangul(event.key));
    }
  };
  
  const onChangeUserInput = useCallback(
    (key) => {
      if (!key) return;
      else if (key === "Backspace")
        setGuess(prev =>
          [...prev].filter((it, idx) => {
            return idx !== prev.length - 1 ? true : false;
          })
        );
      else if (key === "Enter") alert("Enter!");
      else {
        setGuess(prev => {
          return prev.length !== 6 ? [...prev, key] : [...prev];
        });
      }
  
    },
    [guess]
  );

  useEffect(() => {
    console.log(todayAnswer);
  }, [todayAnswer]);

  useEffect(() => {
    console.log(guess);
  }, [guess]);


  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    checkAndCreateGameState();
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="App">
      <Main guess={guess} />
    </div>
  );
}

export default App;
