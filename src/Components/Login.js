import React from 'react'
import { useState } from 'react'
import "../Popup.css"

export default function Login(props) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = event => {
        event.preventDefault();

        fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify({user: {username, password}})
        })
            .then(res => res.json())
            .then(result => {
                if (result.error) {
                    console.log("nawp")
                    console.log(result)
                } else {
                    props.setLogInButtonPopup(!props.trigger)
                    props.setIsLoggedIn(!props.isLoggedIn)
                    props.setUser(result.existingUser)
                    console.log("yawp")
                    console.log(result)
                    console.log(result.existingUser)
                }
            })
            
    }

    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick={() => {props.setLogInButtonPopup(!props.trigger)}}>X</button>
                { props.children }
                <h2>Log In</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="username"
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                    <input type="submit" value="Log In"/>
                </form>
            </div>
        </div>
    ) : null ;
}
