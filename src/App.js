import "./App.css";
import Main from "./pages/Main";
import { getVocabByDate } from "./utils/vocab";
import { useEffect } from "react";

function App() {
  const todayAnswer = getVocabByDate(new Date());

  useEffect(() => {
    console.log("todayAnswer", todayAnswer);
  }, [todayAnswer]);

  return (
    <div className="App">
      <Main todayAnswer={todayAnswer} />
    </div>
  );
}

export default App;
