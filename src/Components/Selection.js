import { useState, useEffect } from 'react'
import Request from './Request'

export default function Selection(props) {
    const [ trigger, setTrigger ] = useState(false)
    const [ fakeTot ] = useState(4000)
    const [ description, setDescription ] = useState('')
    const [ amount, setAmount ] = useState('')
    const [ requests, setRequests ] = useState('')
    const [ requestURL ] = useState('http://localhost:4000/requests')
    const [ newFakeTot, setNewFakeTot ] = useState(fakeTot)

    useEffect(() => {
        fetch(requestURL)
            .then(response => response.json())
            .then(requestApi => setRequests(requestApi))
    }, [])

    const toggleTrigger = () => {
        setTrigger(!trigger)
    }

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

        fetch(requestURL, options)
            .then(response => response.json())
            .then(result => {console.log(result)})

        toggleTrigger()
        renderRequests()
    }
 
    const renderRequests = () => {
        if (requests.length) {
            return requests.map(request => {
                return <Request request={request}
                newFakeTot={newFakeTot}setNewFakeTot={setNewFakeTot}/>
            })
        } else { return "No Requests Made"}
    }

    return (trigger) ? 
        (<div className="selection">
            <div className="popup">
                <div className="popup-inner">
                    <button className="close-btn" onClick={ toggleTrigger }>X</button>
                    <div className="container">
                        <div className="row">
                            <div className="column">
                                <h3>My Request</h3>
                            </div>
                        </div>
                        <form onSubmit={ renderRequests,handleSubmit }>
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
        </div>) : 
        (<div className="selection">
            <div className="container">
                <div className="row">
                    <h2>{props.selection.title}</h2>
                </div>
                <div className="row">
                    <img src={props.selection.image} alt={props.selection.name}/>
                </div>
                <hr></hr>
                <div className="row">
                    <h4>Friends on this Pitch</h4>
                </div>
                <hr></hr>
                <div className="row">
                    <h4>Available Funds</h4>
                </div>
                <div className="row">
                    <h4>${newFakeTot}.00</h4>
                    <p><em>You Contributed: ${props.total}.00</em></p>
                </div>
                <div className="row">
                    <h4>Requests</h4>
                </div>
                    { renderRequests()}
                <div className="row">
                    <button className="column" onClick={ toggleTrigger }>Request Funds</button>
                </div>
            </div>
        </div>
    )
}
