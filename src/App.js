import { useEffect, useState } from "react";
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

  const handleKeyDown = (event) => {
    console.log(event.key + " key was pressed!");

    if (convertKeyToHangul(event.key))
      setUserInput(convertKeyToHangul(event.key));
  };

  useEffect(() => {
    console.log(todayAnswer);
  }, [todayAnswer]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    checkAndCreateGameState();
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="App">
      <Main userInput={userInput} />
    </div>
  );
}

export default App;
