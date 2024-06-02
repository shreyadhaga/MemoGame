import React, { useState } from "react";
import './colors.css'

const Card = ({ color, item, handleSelectedCard, toggled, stopflip }) => {

    return (
        <div className="card" onClick={() => !stopflip && handleSelectedCard(item)}>


            {toggled ? (
                <div className="side front">
                    <div className={`dot ${color}`} /> 
                </div>)
                :
                (<div className="side back">
                    <div className={`dot transparent`} />
                </div>)
            }
        </div>
    )
}

export default Card;