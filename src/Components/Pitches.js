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
            return <PitchCard 
                        key={pitch.title} 
                        pitch={pitch}
                        selection={selection} 
                        setSelection={setSelection}/>
        })
    }

    return (selection) ? (
        <Selection 
            selection={selection}
            setSelection={setSelection}
            total={props.total}
            user={props.user}
            formPopUp={formPopUp}/>) : ( 
        <div className="pitches">
            <div className="container">
                {props.user.pitches ? renderPitchCards()
                : null }
                <div className="row">
                        <button className="column" onClick={togglePopUp}>Create Pitch</button>
                </div>
                <CreatePitch 
                    togglePopUp={togglePopUp} 
                    pitches={props.user.pitches} renderPitchCards={renderPitchCards} 
                    user={props.user}
                    formPopUp={formPopUp}/> 
            </div>
        </div>)
}
