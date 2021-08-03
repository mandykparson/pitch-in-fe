import { useState } from 'react'

export default function MyAccount(props) {

    const [ trigger, setTrigger ] = useState(false)
    const [ userID ] = useState(props.user.id)

    const toggleTrigger = () => {
        setTrigger(!trigger)
    }

    const renderBankCard = () => {
        if (props.userBank === '') {
            return "No Bank Linked"
        } else {
            return (
                <div>
                    <div> 
                        <p>{props.userBank}</p>
                    </div>
                    <div className="row">
                        <h4>Total in Checking: ${props.total}</h4>
                    </div>
                </div>
            )
        }
    }

    const patchBank = (bank) => {
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ bank: bank })
        }
        fetch('http://localhost:4000/users/' + userID, options)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(err => {
                console.log("error reading data " + err)
            })
        toggleTrigger()
        props.setUserBank(bank)
    }

    const renderPitches = () => {
        return props.user.pitches.map(pitch => {
            return (
                <div className="row">
                    <p className="two-thirds column">{pitch.title}</p>
                </div>
            )
        })   
    }

    const renderBankButtons = () => {
        return props.banks.map(bank => {
            return (
                <div className="row">
                    <button className="column"
                    onClick={() => {patchBank(bank.name)}}>
                        {bank.name}
                    </button>
                </div>
            )
        })
    }

    return (trigger) ? (
        <div className="my-account">
            <div className="popup">
                <div className="popup-inner">
                    <button className="close-btn" onClick={() => {setTrigger(!trigger)}}>X</button>
                    <div className="container">
                        <div className="row">
                            <div className="column">
                                <h3>Select Your Bank</h3>
                            </div>
                        </div>
                        { renderBankButtons() }
                    </div>
                </div>
            </div>
        </div>) :
        (<div className="myaccount">
            <div className="container">
                    <h2>Account Settings</h2>
                    <div className="row">
                        <p><strong>Your Name: </strong>{props.user.username}</p>
                    </div>
                    <div className="row">
                        <p><strong>Your Pitches: </strong> { renderPitches() }</p>
                    </div>
                    <div className="row">
                        <div className="two-thirds column">
                        <p><strong>Your Current Bank: </strong> { renderBankCard() }</p>
                        </div>
                        <button className="one-third column" onClick={ toggleTrigger }>Add Bank</button>
                    </div>
            </div>
        </div>) ;
}
