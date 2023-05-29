import React from "react";

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

const flame = () => {
    return (
        <div className="backgroundWrap">
            <div className="flame bottom"></div>
            <div className="flame left"></div>
            <div className="flame right"></div>
        </div>
    );
};

const flame2 = () => {
    return (
        <div className="backgroundWrap">
            <div className="flame2"></div>
        </div>
    );
};

const Background = ({ mode }) => {
    console.log(`MODE = ${mode}`);
    return <div>{mode ? blossomLeaf() : flame2()}</div>;
};

export default React.memo(Background);
