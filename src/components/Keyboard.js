import { useEffect, useState } from 'react';
import { keyboardArr } from '../constants/Const';

const Keyboard = ({ keyResults, handleKeyboardClick, onChangeUserInput }) => {
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
