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
    const [guesses, setGuesses] = useState([]);

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
                handleEnterGuess(enterGuess(currentGuess));
            } else {
                setCurrentGuess((prev) => {
                    return prev.length !== 6 ? [...prev, key] : [...prev];
                });
            }
        },
        [currentGuess, todayAnswer]
    );

    const handleEnterGuess = (resultType) => {
        switch (resultType) {
            case "NOT_ENOUGH":
                alert("음운이 부족합니다.");
                break;
            case "WRONG":
                alert("틀렸습니다! 다시 시도 해보세요");
                setGuesses((prev) => [...prev, currentGuess]);
                setCurrentGuess([]);
                break;
            case "CORRECT":
                alert("정답입니다! 축하드립니다!");
                setGuesses((prev) => [...prev, currentGuess]);
                setCurrentGuess([]);
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

            onChangeUserInput(event);
        },
        [onChangeUserInput]
    );

    useEffect(() => {
        console.log("currentGuess", currentGuess);
    }, [currentGuess]);
    useEffect(() => {
        console.log("guesses", guesses);
    }, [guesses]);

    useEffect(() => {
        document.addEventListener("keyup", handleKeyUp);
        return () => {
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, [handleKeyUp]);

    useEffect(() => {
        checkAndCreateGameState();
    }, []);

    const rendering = () => {
        const result = [];
        for (let i = 1; i < maxTrialCount - guesses.length; i++) {
            result.push(<Input guess={[]} status={"future"} />);
        }
        return result;
    };

    return (
        <div className="playBoard">
            <Header />
            {guesses.map((it) => {
                return <Input guess={it} status={"past"} />;
            })}
            <Input guess={currentGuess} status={"current"} />
            {rendering()}
            <Keyboard handleKeyboardClick={handleKeyboardClick} onChangeUserInput={onChangeUserInput} />
        </div>
    );
};

export default Main;
