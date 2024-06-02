import React, { useState } from "react";
import GameBoard from './GameBoard';
import './styles.css'

const App = () => {
    const [level, setLevel] = useState(1);
    const handleNext = () => {
        if (level < 4) {
            setLevel(level + 1)
        }
    }

    const handleReset = () => {
        setLevel(1)
    }

    return (
        <div className="container">
            <div className="game">
                {level < 4 ?
                    <>
                        <h1> Level {level} </h1>
                        <GameBoard level={level} handleNext={handleNext} />
                    </>
                    :
                    <>
                        <h1> Wooho! Finished</h1>
                        <div className="actions-bar">
                            <button onClick={() => handleReset()}>
                                Replay
                            </button>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default App;