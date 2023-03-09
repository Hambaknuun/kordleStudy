import { useEffect } from "react";
import "./App.css";
import Main from "./pages/Main";
import { getVocabByDate, checkAndCreateGameState } from "./utils/vocab";

function App() {
  const todayAnswer = getVocabByDate(new Date());

  useEffect(() => {
    console.log(todayAnswer);
  }, [todayAnswer]);

  useEffect(() => {
    checkAndCreateGameState();
  }, []);

  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
