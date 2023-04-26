import { useEffect, useState } from 'react';
import { keyboardArr } from '../constants/Const';

const Keyboard = ({ guessResults, handleKeyboardClick, onChangeUserInput }) => {
    const [keyResults, setKeyResults] = useState({});
    useEffect(() => {
        console.log("guessResults", guessResults);
        if(guessResults && guessResults.length > 0){
            guessResults.map((guess)=>{
                guess.map((it) => {
                    if (it.value in keyResults) {
                        if (it.status !== keyResults[it.value]) { 
                            if (it.status === 'correct' && keyResults[it.value] !== 'correct')
                                setKeyResults(prev => ({
                                    ...prev,
                                    [it.value]: it.status
                                }));
                            else if (it.status === 'present' && keyResults[it.value] === 'absent')
                                setKeyResults(prev => ({
                                    ...prev,
                                    [it.value]: it.status
                                }));
                        }
                    } else { 
                        setKeyResults(prev => ({ 
                            ...prev,
                            [it.value] : it.status
                        })
                        )
                    }
                })
            })
        }
    }, [guessResults]);

    useEffect(() => {
        console.log("keyResults", keyResults);
    }, [keyResults])
    const KeyboardBtn = ({ val, className, onClickFunc, clickVal }) => {
        return (
            <button className={className} onClick={() => onClickFunc(clickVal)}>
                {val}
            </button>
        );
    };

    function generateKeyboard(arr) {
        let resultArr = [];
        arr.map((it, idx) => {
            resultArr.push(
                <KeyboardBtn
                    val={it}
                    clickVal={it}
                    key={idx}
                    className={["keyboardBtn", keyResults[it]].join(" ")}
                    onClickFunc={handleKeyboardClick}
                />
            );
        });
        return resultArr;
    }

    return (
        <article className="keyboard">
            <div className="keyboardLine">{generateKeyboard(keyboardArr[0])}</div>
            <div className="keyboardLine">{generateKeyboard(keyboardArr[1])}</div>
            <div className="keyboardLine">
                <KeyboardBtn
                    val={"입력"}
                    className={"keyboardFuncBtn"}
                    onClickFunc={onChangeUserInput}
                    clickVal={"Enter"}
                />
                {generateKeyboard(keyboardArr[2])}
                <KeyboardBtn
                    val={"삭제"}
                    className={"keyboardFuncBtn"}
                    onClickFunc={onChangeUserInput}
                    clickVal={"Backspace"}
                />
            </div>
        </article>
    );
};

export default Keyboard;
