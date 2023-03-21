import { useEffect } from "react";
import * as Hangul from "hangul-js";

const CharBox = ({ idx, val, onChange }) => {
  return <div className="charBx">{val}</div>;
};

const Input = ({ userInput }) => {
  useEffect(() => {
    console.log(userInput);
  }, [userInput]);

  return (
    <div>
      {userInput.map((it, idx) => {
        return <CharBox idx={idx} val={it} />;
      })}
    </div>
  );
};

export default Input;
