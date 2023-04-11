import "./App.css";
import Main from "./pages/Main";
import { getVocabByDate,checkAndCreateGameState } from "./utils/vocab";
import { useEffect } from "react";

function App() {
  const todayAnswer = getVocabByDate(new Date());

  useEffect(() => {
    console.log("todayAnswer", todayAnswer);
  }, [todayAnswer]);
  
  useEffect(() => {
    checkAndCreateGameState();
  }, []);

  return (
    <div className="App">
      <Main todayAnswer={todayAnswer} />
    </div>
  );
}

export default App;
