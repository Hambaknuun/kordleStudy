import "./App.css";
import Main from "./pages/Main";
import { useReducer, useEffect } from "react";
import { initialState, reducer } from "./reducer/reducer";

function App() {
    const [values, dispatch] = useReducer(reducer, initialState);
    const blossomLeaf = () => {
        const result = [];
        for (let i = 0; i < 7; i++) {
            const bgImg = `url("/public/img/blossom_leaf_${i + 1}.png");`;
            const animation = `snowfall ${
                5 + Math.random(10)
            }s linear infinite`;
            const animationDelay = Math.random(10);
            const styleArr = `
            --bg-img=${bgImg} 
            --size=${Math.random() * (30 - 15) + 15} + 'px'
            --left-ini=${Math.random(20) - 10} 
            --left-end=${Math.random(20) - 10}
            --left=${Math.random(100)}
            --animation=${10 + Math.random(10)}
            --animation-delay=${Math.random(10)}
            `;
            result.push(
                <div
                    class={["blossomLeaf", `img${i + 1}`].join(" ")}
                    /* style={{
                        backgroundImage: bgImg,
                        animation: animation,
                        animationDelay: animationDelay,
                    }} */
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
