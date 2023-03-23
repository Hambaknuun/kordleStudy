import { useEffect, useState, useCallback } from "react";
import * as Hangul from "hangul-js";

const CharBox = ({ idx, val, onChange }) => {
  return <div className="charBx">{val}</div>;
};

const Input = ({ userInput }) => {
  const [guess, setGuess] = useState([]);

  const onChangeUserInput = useCallback(
    (key) => {
      if (!key) return;
      else if (key === "Backspace")
        setGuess(
          [...guess].filter((it, idx) => {
            return idx !== guess.length - 1 ? true : false;
          })
        );
      else if (key === "Enter") alert("Enter!");
      else if (guess.length !== 6) setGuess([...guess, key]);

      console.log(guess);
    },
    [guess]
  );

  useEffect(() => {
    onChangeUserInput(userInput);
  }, [userInput]);

  return (
    <div>
      {guess.map((it, idx) => {
        return <CharBox key={idx} idx={idx} val={it} />;
      })}
    </div>
  );
};

export default Input;
