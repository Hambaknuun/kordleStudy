import Header from "../components/Header";
import Input from "../components/Input";
import Keyboard from "../components/Keyboard";

const Main = ({ guess }) => {
  return (
    <div className="playBoard">
      <Header />
      <Input guess={guess} />
      <Keyboard />
    </div>
  );
};

export default Main;
