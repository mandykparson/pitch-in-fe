import React from 'react'

export default function PitchCard(props) {
    return (
        <div className="pitch-card" onClick={() => props.setSelection(props.pitch)}>
            <div className="row">
                <img className="seven columns" src={props.pitch.image} alt={props.pitch.title}/>
                <div className="five columns">
                    <h3>{props.pitch.title}</h3>
                    <p>{props.pitch.description}</p>
                    <p>Total Pitched In: ${props.pitch.total}</p>
                </div>
            </div>  
        </div>
    )
}
