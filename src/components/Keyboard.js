const Keyboard = ({ handleKeyboardClick }) => {
    return (
        <article className="keyboard">
            <section>
                <button
                    className="keyboardBtn"
                    onClick={() => handleKeyboardClick("ㅂ")}
                >
                    ㅂ
                </button>
            </section>
        </article>
    );
};

export default Keyboard;
