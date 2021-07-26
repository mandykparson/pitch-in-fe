import React from 'react'
import PitchCard from './PitchCard'


export default function Pitches(props) {


    const renderPitchCards = () => {
        return props.user.pitches.map(pitch => {
            return <PitchCard pitch={pitch}/>
        })
    }
    return (
        <div className="container">
            {renderPitchCards ()}
            <button>Create Pitch</button>
        </div>
    )
}
