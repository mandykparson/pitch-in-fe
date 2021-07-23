import React from 'react'
import { useState, useEffect } from 'react'
import PitchCard from './PitchCard'


export default function Pitches() {

    const [pitches, setPitches] = useState([])

    useEffect(() => {
        fetch('http://localhost:4000/pitches')
            .then(response => response.json())
            .then(pitchesApi => setPitches(pitchesApi))
    }, [])

    const renderPitchCards = () => {
        console.log(pitches)
        return pitches.map(pitch => {
            return <PitchCard pitch={pitch}/>
        })
    }
    return (
        <div className="container">
            {pitches ? renderPitchCards() : "Nothing Here. Pitch something to get started!"}
        </div>
    )
}
