import React from 'react'
import { useState } from 'react'

export default function MyAccount(props) {

    const [ trigger, setTrigger ] = useState(false)

    const toggleTrigger = () => {
        setTrigger(!trigger)
    }

    const renderBankCard = () => {
        if (props.userBank === '') {
            return "No Bank Linked"
        } else {
            return props.userBank
        }
    }

    const renderPitches = () => {
        return props.user.pitches.map(pitch => {
            return (
                <div className="row">
                    <p className="two-thirds column">{pitch.title}</p>
                    <button className="one-third column">Edit</button>
                </div>
            )
        })   
    }

    const renderRadioBankButtons = () => {
        return props.banks.map(bank => {
            return (
                <div className="row">
                    <button className="column" onClick={() => props.setUserBank(bank.name), toggleTrigger}>
                        {bank.name}
                    </button>
                </div>
            )
        })
    }

    return (trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick={() => {setTrigger(!trigger)}}>X</button>
                <div className="container">
                    <div className="row">
                        <div className="column">
                            <h3>Select Your Bank</h3>
                        </div>
                    </div>
                    { renderRadioBankButtons() }
                </div>
            </div>
        </div>) 
        :
        (<div className="container">
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
            </div>) ;
}
