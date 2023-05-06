import "./App.css";
import Main from "./pages/Main";
import { useReducer } from "react";
import { initialState, reducer } from "./reducer/reducer";

function App() {
    const [values, dispatch] = useReducer(reducer, initialState);
    return (
        <div className="App">
            <div
                className={[
                    "bgImg",
                    "snowflake",
                    values.EZMode ? "EZMode" : "HARDMode",
                ].join(" ")}
            ></div>
            <div
                className={[
                    "bgImg",
                    "snowflake2",
                    values.EZMode ? "EZMode" : "HARDMode",
                ].join(" ")}
            ></div>
            <Main />
        </div>
    );
}

export default App;
