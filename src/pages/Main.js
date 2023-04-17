import Header from "../components/Header";
import Input from "../components/Input";
import Keyboard from "../components/Keyboard";
import { useEffect, useState, useCallback } from "react";
import {
    checkAndCreateGameState,
    convertKeyToHangul,
    enterGuess,
} from "../utils/vocab";

const Main = ({ todayAnswer }) => {
    const maxTrialCount = 6;
    const [currentGuess, setCurrentGuess] = useState([]);
    const [isCorrect, setIsCorrect] = useState(false);
    const [EZMode, setEZMode] = useState(false);
    const [guesses, setGuesses] = useState([]);

    useEffect(() => {
        checkAndCreateGameState();

        const localGameState = JSON.parse(localStorage.getItem("gameState"))
            ? JSON.parse(localStorage.getItem("gameState"))
            : [];
        const localGuesses = localGameState?.guesses;

        setGuesses(localGuesses);

        if (guesses) {
            const resultType = enterGuess(guesses.at(-1));
            if (resultType === "CORRECT") {
                handleGuessResultMsg(resultType);
                setIsCorrect(true);
            }
        }
    }, []);

    const onChangeUserInput = useCallback(
        (key) => {
            if (!key) return;
            else if (key === "Backspace")
                setCurrentGuess((prev) =>
                    [...prev].filter((it, idx) => {
                        return idx !== prev.length - 1 ? true : false;
                    })
                );
            else if (key === "Enter") {
                const guessResult = enterGuess(currentGuess);
                if (guessResult !== "NOT_ENOUGH") {
                    setGuesses((prev) => [...prev, currentGuess]);
                    setCurrentGuess([]);
                }
                handleGuessResultMsg(guessResult);
            } else {
                setCurrentGuess((prev) => {
                    return prev.length !== 6 ? [...prev, key] : [...prev];
                });
            }
        },
        [currentGuess, todayAnswer]
    );

    const handleGuessResultMsg = (resultType) => {
        switch (resultType) {
            case "NOT_ENOUGH":
                alert("음운이 부족합니다.");
                break;
            case "WRONG":
                alert("틀렸습니다! 다시 시도 해보세요");
                if (EZMode)
                    setGuesses((prev) =>
                        prev.length >= 6 ? [...prev.splice(1)] : [...prev]
                    );
                break;
            case "CORRECT":
                alert("정답입니다! 축하드립니다!");
                setIsCorrect(true);
                break;
            default:
                break;
        }
    };

    const handleKeyUp = useCallback(
        (event) => {
            console.log(event.key + " key was pressed!");

            if (convertKeyToHangul(event.key)) {
                onChangeUserInput(convertKeyToHangul(event.key));
            }
        },
        [onChangeUserInput]
    );

    const handleKeyboardClick = useCallback(
        (event) => {
            console.log(event + " keyboard Click!");
            if (isCorrect) return;
            onChangeUserInput(event);
        },
        [onChangeUserInput]
    );

    useEffect(() => {
        console.log("currentGuess", currentGuess);
    }, [currentGuess]);

    useEffect(() => {
        console.log("guesses", guesses);

        const localGameState = JSON.parse(localStorage.getItem("gameState"))
            ? JSON.parse(localStorage.getItem("gameState"))
            : [];
        localGameState.guesses = guesses;
        localStorage.setItem("gameState", JSON.stringify(localGameState));
    }, [guesses]);

    useEffect(() => {
        document.addEventListener("keyup", handleKeyUp);
        if (isCorrect) document.removeEventListener("keyup", handleKeyUp);
        return () => {
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, [handleKeyUp, isCorrect]);

    const inputs = () => {
        const result = [];
        guesses.map((it) => {
            result.push(<Input guess={it} status={"past"} />);
        });
        // EZ모드 Validation 추가
        if (EZMode || guesses.length < 6)
            result.push(<Input guess={currentGuess} status={"current"} />);

        for (let i = 1; i < maxTrialCount - guesses.length; i++) {
            result.push(<Input guess={[]} status={"future"} />);
        }
        return result;
    };

    return (
        <div className="playBoard">
            <Header
                toggleEZMode={() => setEZMode((prev) => !prev)}
                EZMode={EZMode}
            />
            {inputs()}
            <Keyboard
                handleKeyboardClick={handleKeyboardClick}
                onChangeUserInput={onChangeUserInput}
            />
        </div>
    );
};

export default Main;
