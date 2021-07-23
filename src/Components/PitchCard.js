import React from 'react'

export default function PitchCard(props) {
    console.log(props.pitch)
    return (
        <div className="container">
            <div className="row">
                <img className="one-third column" src={props.pitch.image}/>
                <div className="two-thirds column">
                    <h3>{props.pitch.title}</h3>
                    <p>{props.pitch.description}</p>
                    <h3>${props.pitch.total}</h3>
                </div>
            </div>    
        </div>
    )
}
