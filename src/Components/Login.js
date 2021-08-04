import { useState } from 'react'
import "../Popup.css"

export default function Login(props) {

    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ loginURL ] = useState('http://localhost:4000/login')
    const [ error, setError ] = useState('')

    const handleSubmit = event => {
        event.preventDefault();
        const options = {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify({user: {username, password}})
        }

        fetch(loginURL, options)
            .then(res => res.json())
            .then(result => {
                if (result.error) {
                    setError(result.error)
                } else {
                    props.setLogInButtonPopup(!props.trigger)
                    props.setIsLoggedIn(!props.isLoggedIn)
                    props.setUser(result.existingUser)
                    setError('')
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
                    {error ? <p style={{color: "white"}}>{error}</p> : null}
                </form>
            </div>
        </div>
    ) : null ;
}
