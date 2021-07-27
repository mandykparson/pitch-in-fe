import React from 'react'
import PitchCard from './PitchCard'
import { useState } from 'react'


export default function Pitches(props) {

    const [ formPopUp, setFormPopUp ] = useState(false)
    const [ title, setTitle ] = useState('')
    const [ description, setDescription] = useState('')
    const [ image, setImage ] = useState('')
    const [ total, setTotal ] = useState(0)
    const [ pitchesURL ] = useState('http://localhost:4000/pitches')

    const togglePopUp = () => {
        setFormPopUp(!formPopUp)
    }

    const renderPitchCards = () => {
        return props.user.pitches.map(pitch => {
            return <PitchCard key={pitch.title} pitch={pitch}/>
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
        fetch('http://localhost:4000/pitches', {
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
                <button className="close-btn" onClick={() => {setFormPopUp(!formPopUp)}}>X</button>
                <h2>Create Pitch</h2>
                <form onSubmit={handleSubmit}>
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
        <div className="container">
            {props.user.pitches ? renderPitchCards()
            : "" }
            <button onClick={togglePopUp}>Create Pitch</button> 
        </div>;
}
