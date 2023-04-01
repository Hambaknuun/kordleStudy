const CharBox = ({ idx, val, onChange }) => {
  return <div className={[
    "charItem", val ? "active" : ""
  ].join(" ")}>{val}</div>;
};

const Input = ({ guess, status }) => {
  const handleGuessResult = (guess) => {
    const type = guess?.type;
    switch (type) {
      case "NOT_ENOUGH":
        alert("음운이 부족합니다.");
        break;
      case "WRONG":
        alert("틀렸습니다! 다시 시도 해보세요");
        break;
      case "CORRECT":
        alert("정답입니다! 축하드립니다!");
        break;
      default:
        break;
    }
  };

  function inputBlock(guess) {
    let arr = [];
    for (let i = 0; i < 6; i++) {
      if (guess[i]) {
        arr.push(<CharBox key={i} val={guess[i]} />);
      } else {
        arr.push(<CharBox />);
      }
    }
    return arr;
  }

  return (
    <div className="inputLine">
      {/* {guess.map((it, idx) => {
        return <CharBox key={idx} idx={idx} val={it} />;
      })} */}
      {inputBlock(guess)}
    </div>
  );
};

export default Input;
