import { useEffect, useState } from "react";
import "./App.css";
import Main from "./pages/Main";
import { getVocabByDate, checkAndCreateGameState } from "./utils/vocab";

function App() {
  const todayAnswer = getVocabByDate(new Date());
  const [userInput, setUserInput] = useState([]);

  const handleKeyDown = (event) => {
    console.log(event.key + " key was pressed!");
    if (onlyKorean(event.key)) {
      setUserInput([...setUserInput, event.key]);
    }
  };

  const onlyKorean = (char) => {
    const pattern = /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;

    char = char.replace(pattern, "");
    return char;
  };

  useEffect(() => {
    console.log(todayAnswer);
  }, [todayAnswer]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    checkAndCreateGameState();
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    }
  }, []);

  return (
    <div className="App">
      <Main userInput={userInput} />
    </div>
  );
}

export default App;
