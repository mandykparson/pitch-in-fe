import { useState, useEffect } from 'react'
import Request from './Request'
import RequestPopUp from './RequestPopUp'

export default function Selection(props) {
    const [ trigger, setTrigger ] = useState(false)
    const [ fakeTot ] = useState(4000)
    const [ requests, setRequests ] = useState('')
    const [ requestURL ] = useState('http://localhost:4000/requests')
    const [ users, setUsers ] = useState([])
    const [ usersURL ] = useState('http://localhost:4000/users')
    const [ newFakeTot, setNewFakeTot ] = useState(fakeTot)

    useEffect(() => {
        fetch(requestURL)
            .then(response => response.json())
            .then(requestApi => setRequests(requestApi))
        
        fetch(usersURL)
            .then(response => response.json())
            .then(usersApi => setUsers(usersApi))
    }, [])


    const toggleTrigger = () => {
        setTrigger(!trigger)
    }

    const renderFriends = () => {
        return users.map(friend => {
            return <li>{friend.username}</li>
        })
    }

    const renderRequests = () => {
        if (requests.length) {
            return requests.map(request => {
                return <Request 
                    request={request}
                    newFakeTot={newFakeTot}
                    setNewFakeTot={setNewFakeTot}/>
            })
        } else { return "No Requests Made"}
    }

    return (
        <div className="selection">
            <div className="container">
                <div className="row">
                    <h2>{props.selection.title}</h2>
                </div>
                <div className="row">
                    <img className="column" src={props.selection.image} alt={props.selection.name}/>
                </div>
                <hr></hr>
                <div className="row">
                    <h4>Friends on this Pitch</h4>
                        <ul>
                            { renderFriends() }
                        </ul>
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
                    <RequestPopUp 
                        trigger={trigger}
                        toggleTrigger={toggleTrigger}
                        requests={requests}
                        setRequests={setRequests}
                        user={props.user}
                        selection={props.selection}
                        fakeTot={fakeTot}
                        setFakeTot={fakeTot}
                        newFakeTot={newFakeTot}
                        setNewFakeTot={setNewFakeTot}
                        requestURL={requestURL}
                        renderRequests={renderRequests}/>
                </div>
            </div>
        </div>
    )
}
