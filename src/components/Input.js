import { useEffect } from "react";
import {
    getGuessResult
} from "../utils/vocab";

const CharBox = ({ val, type }) => {
    const charBoxClass = type ? type : (val ? "active" : "");
    return (
        <div className={["charItem", charBoxClass].join(" ")}>{val}</div>
    );
};

const Input = ({ guess, status }) => {
    function inputBlock(guess) {
        let arr = [];
        for (let i = 0; i < 6; i++) {
            if (guess[i]) {
                arr.push(<CharBox key={i} val={guess[i]} />);
            } else {
                arr.push(<CharBox key={i} />);
            }
        }
        return arr;
    }
    function generateCharBoxPast(guessResult) {
        let arr = [];
        guessResult.map((it, idx)=>{
            arr.push(<CharBox key={idx} val={it.value} type={it.status}/>);
        });
        return arr;
    }

    return <div className="inputLine">
            {
            status==="past" ? 
                generateCharBoxPast(getGuessResult(guess)) 
                : 
                inputBlock(guess)
            }
            </div>;
};

export default Input;
