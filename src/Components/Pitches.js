import React from 'react'
import PitchCard from './PitchCard'
import { useState } from 'react'
import Selection from './Selection'


export default function Pitches(props) {

    const [ formPopUp, setFormPopUp ] = useState(false)
    const [ title, setTitle ] = useState('')
    const [ description, setDescription] = useState('')
    const [ image, setImage ] = useState('')
    const [ total, setTotal ] = useState(0)
    const [ pitchesURL ] = useState('http://localhost:4000/pitches/')
    const [ selection, setSelection ] = useState('')

    const togglePopUp = () => {
        setFormPopUp(!formPopUp)
    }

    const renderPitchCards = () => {
        return props.user.pitches.map(pitch => {
            return <PitchCard selection={selection} setSelection={setSelection} key={pitch.title} pitch={pitch}/>
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newPitch = {
            title: title,
            description: description,
            image: image,
            total: total
        }
        fetch(pitchesURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': "application/json",
            },
            body: JSON.stringify({ pitch: newPitch })
        })
            .then(response => response.json())
            .then(result => {
                const user_id = props.user.id
                const pitch_id = result.id;
                const newUserPitch = { user_id: user_id, pitch_id: pitch_id}
                

                fetch('http://localhost:4000/user_pitches', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': "application/json",
                    },
                    body: JSON.stringify({ user_pitch: newUserPitch })
                })
                .then(response => response.json())
                .then(result => console.log(result))
            })
    }

    return (formPopUp) ? (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick={togglePopUp}>X</button>
                <h2>Create Pitch</h2>
                <form onSubmit={handleSubmit, togglePopUp}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Name Your Pitch"
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="description"
                        value={description}
                        onChange={event => setDescription(event.target.value)}
                    />
                    <input
                        type="text"
                        name="image"
                        placeholder="c + v your image url"
                        value={image}
                        onChange={event => setImage(event.target.value)}
                    />
                    <input
                        type="number"
                        name="total"
                        placeholder="What you can contribute"
                        value={total}
                        onChange={event => setTotal(event.target.value)}
                    />
                    <input type="submit" value="Create"/>
                </form>
            </div>
        </div>) 
        : 
        (selection) ? (
            <Selection 
                selection={selection}
                setSelection={setSelection}
                total={props.total}
                user={props.user}/>
        )
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
