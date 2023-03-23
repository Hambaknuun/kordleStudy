import { useEffect, useState, useCallback } from "react";
import * as Hangul from "hangul-js";

const CharBox = ({ idx, val, onChange }) => {
  return <div className="charBx">{val}</div>;
};

const Input = ({ guess }) => {

  return (
    <div>
      {guess.map((it, idx) => {
        return <CharBox key={idx} idx={idx} val={it} />;
      })}
    </div>
  );
};

export default Input;
