import { useState } from 'react'
import Request from './Request'

export default function RequestPopUp(props) {

    const [ description, setDescription ] = useState('')
    const [ amount, setAmount ] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const newRequest = {
            description: description,
            amount: amount,
            user_id: props.user.id,
            pitch_id: props.selection.id
        }
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ request: newRequest})
        }

        fetch(props.requestURL, options)
            .then(response => response.json())
            .then(result => {console.log(result)})

        props.toggleTrigger()
        props.setRequests([...props.requests, newRequest])
        props.renderRequests()
    }

    return (props.trigger) ? (
        <div className="selection">
            <div className="popup">
                <div className="popup-inner">
                    <button className="close-btn" onClick={ props.toggleTrigger }>X</button>
                    <div className="container">
                        <div className="row">
                            <div className="column">
                                <h3>My Request</h3>
                            </div>
                        </div>
                        <form onSubmit={ handleSubmit }>
                            <div className="row">
                                <div className="column">
                                    <input
                                        type="text"
                                        name="description"
                                        placeholder="I need money for . . ."
                                        value={description}
                                        onChange={event => setDescription(event.target.value)}
                                    />
                                    <input
                                        type="number"
                                        name="amount"
                                        placeholder="$ Amount"
                                        value={amount}
                                        onChange={event => setAmount(event.target.value)}
                                    />
                                    <input type="submit" value="Submit"/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
}
