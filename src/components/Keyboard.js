const keyboardArr1 = ["ㅂ", "ㅈ", "ㄷ", "ㄱ", "ㅅ", "ㅛ", "ㅕ", "ㅑ"];
const keyboardArr2 = ["ㅁ", "ㄴ", "ㅇ", "ㄹ", "ㅎ", "ㅗ", "ㅓ", "ㅏ", "ㅣ"];
const keyboardArr3 = ["ㅋ", "ㅌ", "ㅊ", "ㅍ", "ㅠ", "ㅜ", "ㅡ"];

const Keyboard = ({ handleKeyboardClick, onChangeUserInput }) => {
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
                    className={"keyboardBtn"}
                    onClickFunc={handleKeyboardClick}
                />
            );
        });
        return resultArr;
    }

    return (
        <article className="keyboard">
            <div className="keyboardLine">{generateKeyboard(keyboardArr1)}</div>
            <div className="keyboardLine">{generateKeyboard(keyboardArr2)}</div>
            <div className="keyboardLine">
                <KeyboardBtn
                    val={"입력"}
                    className={"keyboardFuncBtn"}
                    onClickFunc={onChangeUserInput}
                    clickVal={"Enter"}
                />
                {generateKeyboard(keyboardArr3)}
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
