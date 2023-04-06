const keyboardArr1 = ['ㅂ', 'ㅈ', 'ㄷ', 'ㄱ', 'ㅅ', 'ㅛ', 'ㅕ', 'ㅑ'];
const keyboardArr2 = ['ㅁ', 'ㄴ', 'ㅇ', 'ㄹ', 'ㅎ', 'ㅗ', 'ㅓ', 'ㅏ', 'ㅣ'];
const keyboardArr3 = ['ㅋ', 'ㅌ', 'ㅊ', 'ㅍ', 'ㅠ', 'ㅜ', 'ㅡ'];

const Keyboard = ({ handleKeyboardClick }) => {

    const KeyboardBtn = ({val}) => {
        return(
            <button
                className="keyboardBtn"
                onClick={() => handleKeyboardClick(val)}
            >
                {val}
            </button>
        )
    }

    function generateKeyboard(arr) {
        let resultArr = [];
        arr.map((it, idx) => {
            resultArr.push(<KeyboardBtn val={it} key={idx} />)
        })
        return resultArr;
    }

    return (
        <article className="keyboard">
            <div className="keyboardLine">
                {generateKeyboard(keyboardArr1)}
            </div>
            <div className="keyboardLine">
                {generateKeyboard(keyboardArr2)}
            </div>
            <div className="keyboardLine">
                {generateKeyboard(keyboardArr3)}
            </div>
        </article>
    );
};

export default Keyboard;