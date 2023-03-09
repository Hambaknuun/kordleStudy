import { useEffect } from "react";
import "./App.css";
import Main from "./pages/Main";
import { getVocabByDate, createGameState } from "./utils/vocab";

function App() {
  const todayAnswer = getVocabByDate(new Date());

  useEffect(() => {
    console.log(todayAnswer);
  }, [todayAnswer]);

  useEffect(() => {
    // 게임 최초 접속인 경우
    if (!localStorage.getItem("gameState")) {
      createGameState();
    }
  }, []);

  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
