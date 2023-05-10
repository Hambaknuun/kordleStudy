import Header from "../components/Header";
import Input from "../components/Input";
import Keyboard from "../components/Keyboard";
import { useEffect, useState, useCallback, useReducer } from "react";
import { maxTrialCount } from "../constants/Const";
import { initialState, reducer } from "../reducer/reducer";
import {
    todayAnswer,
    checkAndCreateGameState,
    convertKeyToHangul,
    enterGuess,
    getTodayAnswerAssembled,
    getkeyResults,
    setLocalGameStatistics,
} from "../utils/vocab";

const AlertPopup = ({ alertMsg, isSuccess }) => {
    return (
        <div
            className={["alertPopup", `${isSuccess ? "success" : ""}`].join(
                " "
            )}
        >
            {alertMsg}
        </div>
    );
};

const Main = () => {
    const [values, dispatch] = useReducer(reducer, initialState);
    const [showAlertMsg, setShowAlertMsg] = useState(false);
    const [alertMsgInfo, setAlertMsgInfo] = useState({
        message: "",
        isSuccess: false,
    });

    useEffect(() => {
        checkAndCreateGameState();

        const localGameState = JSON.parse(localStorage.getItem("gameState"))
            ? JSON.parse(localStorage.getItem("gameState"))
            : [];
        const localGuesses = localGameState?.guesses;

        dispatch({
            type: "INITIALIZE_GUESSES_LOCALSTORAGE",
            data: localGuesses,
        });

        if (localGuesses) {
            const resultType = enterGuess(localGuesses.at(-1));
            if (resultType === "CORRECT") {
                dispatch({ type: "CORRECT" });
                handleGuessResultMsg(resultType);
            }
        }
    }, []);

    const onChangeUserInput = useCallback(
        (key) => {
            if (!key || values.isCorrect) return;
            if (values.EZMode === false && values.guesses.length >= 6) return;
            else if (key === "Backspace") dispatch({ type: "BACKSPACE" });
            else if (key === "Enter") {
                const guessResult = enterGuess(values.currentGuess);
                if (guessResult !== "NOT_ENOUGH") {
                    dispatch({ type: "INSERT_GUESSES" });
                    dispatch({ type: "INITIALIZE_CURRENT" });
                }
                handleGuessResultMsg(guessResult);
            } else {
                dispatch({ type: "KEY_INPUT", key: key });
            }
        },
        [values.currentGuess, todayAnswer]
    );

    const handleGuessResultMsg = (resultType) => {
        switch (resultType) {
            case "NOT_ENOUGH":
                setShowAlertMsg(true);
                setAlertMsgInfo({
                    message: "음운이 부족합니다.",
                    isSuccess: false,
                });
                setTimeout(() => {
                    setShowAlertMsg(false);
                }, 1500);
                break;
            case "WRONG":
                if (values.EZMode === false && values.guesses.length === 5) {
                    setShowAlertMsg(true);
                    setAlertMsgInfo({
                        message: `실패했습니다. 오늘의 정답은 "${getTodayAnswerAssembled()}" 입니다.`,
                        isSuccess: false,
                    });
                    setTimeout(() => {
                        setShowAlertMsg(false);
                    }, 1500);
                } else {
                    setShowAlertMsg(true);
                    setAlertMsgInfo({
                        message: "틀렸습니다! 다시 시도 해보세요",
                        isSuccess: false,
                    });
                    setTimeout(() => {
                        setShowAlertMsg(false);
                    }, 1500);
                }
                if (values.EZMode) dispatch({ type: "SPLICE_GUESSES" });
                break;
            case "CORRECT":
                setShowAlertMsg(true);
                setAlertMsgInfo({
                    message: "정답입니다! 축하드립니다!",
                    isSuccess: true,
                });
                setTimeout(() => {
                    setShowAlertMsg(false);
                }, 1500);
                dispatch({ type: "CORRECT" });
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
            if (values.isCorrect) return;
            onChangeUserInput(event);
        },
        [onChangeUserInput]
    );

    useEffect(() => {
        console.log("currentGuess", values.currentGuess);
    }, [values.currentGuess]);

    useEffect(() => {
        console.log("guesses", values.guesses);

        const localGameState = JSON.parse(localStorage.getItem("gameState"))
            ? JSON.parse(localStorage.getItem("gameState"))
            : [];
        localGameState.guesses = values.guesses;
        localStorage.setItem("gameState", JSON.stringify(localGameState));

        if (values.guesses.length === 6 && !values.EZMode) {
            setLocalGameStatistics(false);
        }
    }, [values.guesses]);

    useEffect(() => {
        if (values.isCorrect && !values.EZMode) {
            setLocalGameStatistics(true);
        }
    }, [values.isCorrect]);

    useEffect(() => {
        document.addEventListener("keyup", handleKeyUp);
        if (values.isCorrect)
            document.removeEventListener("keyup", handleKeyUp);
        return () => {
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, [handleKeyUp, values.isCorrect]);

    const inputs = () => {
        const result = [];
        values.guesses.map((it) => {
            result.push(<Input guess={it} status={"past"} />);
        });
        // EZ모드 Validation 추가
        if (values.EZMode || values.guesses.length < 6) {
            result.push(
                <Input guess={values.currentGuess} status={"current"} />
            );
        }

        for (let i = 1; i < maxTrialCount - values.guesses.length; i++) {
            result.push(<Input guess={[]} status={"future"} />);
        }
        return result;
    };

    const handleToggleEZMode = () => {
        if (values.EZMode) {
            alert("이지모드에서는 하드모드로 변경할 수 없습니다.");
            return;
        }
        if (!values.isCorrect && !values.EZMode && values.guesses.length < 6) {
            dispatch({ type: "TOGGLE_MODE" });
        }
    };

    return (
        <div className="playBoard">
            {showAlertMsg ? (
                <AlertPopup
                    alertMsg={alertMsgInfo.message}
                    isSuccess={alertMsgInfo.isSuccess}
                />
            ) : (
                ""
            )}
            <Header toggleEZMode={handleToggleEZMode} EZMode={values.EZMode} />
            {inputs()}
            <Keyboard
                keyResults={getkeyResults(values.guesses)}
                handleKeyboardClick={handleKeyboardClick}
                onChangeUserInput={onChangeUserInput}
            />
        </div>
    );
};

export default Main;
