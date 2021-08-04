import { useState } from 'react'
import BankPopUp from './BankPopUp'

export default function MyAccount(props) {

    const [ trigger, setTrigger ] = useState(false)

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

    const renderPitches = () => {
        return props.user.pitches.map(pitch => {
            return (
                <div className="row">
                    <p className="two-thirds column">{pitch.title}</p>
                </div>
            )
        })   
    }

    return (
        <div className="myaccount">
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
                            <BankPopUp 
                                user={props.user}
                                trigger={trigger}
                                setTrigger={setTrigger}
                                userBank={props.userBank}
                                setUserBank={props.setUserBank}
                                total={props.total}
                                banks={props.banks}/>
                    </div>
            </div>
        </div>) ;
}
