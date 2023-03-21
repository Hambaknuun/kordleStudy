import Header from "../components/Header";
import Input from "../components/Input";
import Keyboard from "../components/Keyboard";

const Main = ({ userInput }) => {
  return (
    <div className="playBoard">
      <Header />
      <Input userInput={userInput} />
      <Keyboard />
    </div>
  );
};

export default Main;
