import PitchCard from './PitchCard'
import { useState } from 'react'
import Selection from './Selection'
import CreatePitch from './CreatePitch'


export default function Pitches(props) {

    const [ formPopUp, setFormPopUp ] = useState(false)
    const [ selection, setSelection ] = useState('')

    const togglePopUp = () => {
        setFormPopUp(!formPopUp)
    }

    const renderPitchCards = () => {
        return props.user.pitches.map(pitch => {
            return <PitchCard selection={selection} setSelection={setSelection} key={pitch.title} pitch={pitch}/>
        })
    }

    return (formPopUp) ? (
        <CreatePitch togglePopUp={togglePopUp} pitches={props.user.pitches} renderPitchCards={renderPitchCards} user={props.user}/>) 
        : 
        (selection) ? (
            <Selection 
                selection={selection}
                setSelection={setSelection}
                total={props.total}
                user={props.user}/>)
            :
            (<div className="pitches">
                <div className="container">
                    {props.user.pitches ? renderPitchCards()
                    : null }
                    <div className="row">
                            <button className="column" onClick={togglePopUp}>Create Pitch</button> 
                    </div>
                </div>
            </div>)
}
