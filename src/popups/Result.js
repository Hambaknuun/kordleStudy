const ResultPopup = ({ gameResult, setShowResultPopup }) => {
    console.log(gameResult);
    console.log(typeof gameResult);
    const bestStreak = gameResult?.bestStreak;
    const currentStreak = gameResult?.currentStreak;
    const gamesFailed = gameResult?.gamesFailed;
    const bestsuccessRateStreak = gameResult?.bestsuccessRateStreak;
    const totalGames = gameResult?.totalGames;
    const successRate = gameResult?.successRate;
    const [win1, win2, win3, win4, win5, win6] = [1, 2, 0, 5, 6, 3];
    //const [win1, win2, win3, win4, win5, win6] = gameResult?.winDistribution;
    let bestWin =
        Math.max(win1, win2, win3, win4, win5, win6) === 0
            ? 1
            : Math.max(win1, win2, win3, win4, win5, win6);

    console.log(`bestStreak = ${bestStreak}`);
    console.log(`currentStreak = ${currentStreak}`);
    console.log(`gamesFailed = ${gamesFailed}`);
    console.log(`bestsuccessRateStreak = ${bestsuccessRateStreak}`);
    console.log(`totalGames = ${totalGames}`);
    console.log(`successRate = ${successRate}`);
    console.log("winDistribution = ", win1, win2, win3, win4, win5, win6);
    console.log(bestWin);

    return (
        <div className="backgroundBlack">
            <article className="resultPopup">
                <button
                    className="closePopBtn"
                    onClick={() => {
                        setShowResultPopup(false);
                    }}
                >
                    닫기
                </button>
                <dl className="article statics">
                    <dt className="subTitle">통계</dt>
                    <dd className="staticContents">
                        <dl>
                            <dd>{totalGames}</dd>
                            <dt>전체 도전</dt>
                        </dl>
                        <dl>
                            <dd>
                                {((totalGames - gamesFailed) / totalGames) *
                                    100}
                                %
                            </dd>
                            <dt>정답률</dt>
                        </dl>
                        <dl>
                            <dd>{currentStreak}</dd>
                            <dt>최근 연속 정답</dt>
                        </dl>
                        <dl className="charts">
                            <dd>{bestStreak}</dd>
                            <dt>최다 연속 정답</dt>
                        </dl>
                    </dd>
                </dl>
                <dl className="article graph">
                    <dt className="subTitle">도전 분포</dt>
                    <dd className="graphContents">
                        <dl className="graphList">
                            <dt>1</dt>
                            <dd
                                style={{
                                    "--graph-width": `${
                                        (win1 / bestWin) * 100
                                    }%`,
                                }}
                            >
                                {win1}
                            </dd>
                        </dl>
                        <dl className="graphList">
                            <dt>2</dt>
                            <dd
                                style={{
                                    "--graph-width": `${
                                        (win2 / bestWin) * 100
                                    }%`,
                                }}
                            >
                                {win2}
                            </dd>
                        </dl>
                        <dl className="graphList">
                            <dt>3</dt>
                            <dd
                                style={{
                                    "--graph-width": `${
                                        (win3 / bestWin) * 100
                                    }%`,
                                }}
                            >
                                {win3}
                            </dd>
                        </dl>
                        <dl className="graphList">
                            <dt>4</dt>
                            <dd
                                style={{
                                    "--graph-width": `${
                                        (win4 / bestWin) * 100
                                    }%`,
                                }}
                            >
                                {win4}
                            </dd>
                        </dl>
                        <dl className="graphList">
                            <dt>5</dt>
                            <dd
                                style={{
                                    "--graph-width": `${
                                        (win5 / bestWin) * 100
                                    }%`,
                                }}
                            >
                                {win5}
                            </dd>
                        </dl>
                        <dl className="graphList">
                            <dt>6</dt>
                            <dd
                                style={{
                                    "--graph-width": `${
                                        (win6 / bestWin) * 100
                                    }%`,
                                }}
                            >
                                {win6}
                            </dd>
                        </dl>
                    </dd>
                </dl>
            </article>
        </div>
    );
};

export default ResultPopup;
