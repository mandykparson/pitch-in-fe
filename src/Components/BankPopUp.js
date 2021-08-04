import { useState } from 'react'

export default function BankPopUp(props) {

    const [ userID ] = useState(props.user.id)

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
        props.setTrigger(!props.trigger)
        props.setUserBank(bank)
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

    return (props.trigger) ? (
        <div className="my-account">
            <div className="popup"> 
                <div className="popup-inner">
                    <button className="close-btn" onClick={() => {props.setTrigger(!props.trigger)}}>X</button>
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
        </div>
    ) : null;
}
