import { useEffect, useState, useCallback } from "react";
import * as Hangul from "hangul-js";

const CharBox = ({ idx, val, onChange }) => {
  return <div className="charBxItem">{val}</div>;
};

const Input = ({ guess }) => {

  function inputBlock(guess){
    let arr = [];
    for (let i=0; i < 6; i++){
      if(guess[i]){
        arr.push(<CharBox key={i} val={guess[i]} />);
      }else{
        arr.push(<CharBox />);
      }
    }
    return arr;
  }

  return (
    <div className="charBx">
      {/* {guess.map((it, idx) => {
        return <CharBox key={idx} idx={idx} val={it} />;
      })} */}
      {inputBlock(guess)}

      
    </div>
  );
};

export default Input;
