import "./App.css";
import Main from "./pages/Main";
import React, { useReducer, useEffect } from "react";
import { initialState, reducer } from "./reducer/reducer";

function App() {
    const blossomLeaf = () => {
        const result = [];
        for (let i = 0; i < 7; i++) {
            const bgImg = `url("/assets/blossom_leaf_${i + 1}.png")`;
            result.push(
                <div
                    className={["blossomLeaf", `blossomImg_${i + 1}`].join(" ")}
                    style={{
                        "--background-image": bgImg,
                        idx: i + 1,
                        "--size": `${Math.random() * (150 - 120) + 120}px`,
                        "--left-ini": `${Math.random(20) - 10}vw`,
                        "--left-center": `${Math.random(20)}vw`,
                        "--left-end": `${Math.random(20) - 10}vw`,
                        "--left": `${Math.random() * (90 - 10) + 10}vw`,
                        "--animation": `${Math.random(10) + 5}s`,
                        "--animation-delay": `${Math.random(10) * 5}s`,
                    }}
                ></div>
            );
        }
        return result;
    };

    useEffect(() => {});

    return (
        <div className="App">
            {blossomLeaf()}
            <Main />
        </div>
    );
}

export default App;
