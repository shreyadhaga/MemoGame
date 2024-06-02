import React, { useEffect, useState } from "react";
import Card from "./Card";
import { createGameBoard, checkLevelWin } from "./logic";
import './styles.css'

const GameBoard = ({ level, handleNext }) => {
    const [data, setData] = useState([]);
    const [firstCard, setFirstCard] = React.useState(null);
    const [secondCard, setSecondCard] = React.useState(null);
    const [stopFlip, setStopFlip] = React.useState(false);
    const [levelWin, setLevelWin] = React.useState(false);

    useEffect(() => {
        let gameboarddata = createGameBoard(level * 2);
        setData(gameboarddata);
        setLevelWin(false)
    }, [level]);

    useEffect(() => {
        if (firstCard && secondCard) {
            setStopFlip(true);
            if (firstCard.color === secondCard.color) {
                let matrix = data;
                for (let i = 0; i < matrix.length; i++) {
                    for (let j = 0; j < matrix.length; j++) {
                        if (matrix[i][j].id == firstCard.id || matrix[i][j].id == secondCard.id) {
                            matrix[i][j] = { ...matrix[i][j], matched: true }
                        }
                    }
                }
                setData(matrix)
                removeSelection();
            } else {
                setTimeout(() => {
                    removeSelection();
                }, 1000);
            }
            //check for win
            setLevelWin(checkLevelWin(data))
        }
    }, [firstCard, secondCard]);

    const removeSelection = () => {
        setFirstCard(null);
        setSecondCard(null);
        setStopFlip(false);
    }
    const handleSelectedCard = (col) => {
        if (firstCard !== null && firstCard.id !== col.id) {
            setSecondCard(col);
        } else {
            setFirstCard(col);
        }
    }
    return (
        <>
            <div className="gameboard">
                {data.map((row, index) => (
                    <div key={index} className="row">
                        {row.map(col =>
                            <Card
                                key={col.id}
                                item={col}
                                color={col.color}
                                toggled={
                                    col === firstCard ||
                                    col === secondCard ||
                                    col.matched === true
                                }
                                stopFlip={stopFlip}
                                handleSelectedCard={(item) => handleSelectedCard(item)} />
                        )}
                    </div>
                )
                )}
            </div>
            {levelWin &&
                <div className="actions-bar">
                    <button onClick={() => handleNext()}>
                        Next Level
                    </button>
                </div>
            }
        </>
    )
}

export default GameBoard;