import { useState } from 'react'

export default function Requests(props) {

    const [ isDisabled, setIsDisabled ] = useState(false)

    const handleClick = (oldTotal, deduction) => {
        props.setNewFakeTot(oldTotal - deduction)
        setIsDisabled(true)
    }

    return (
        <div className="row">
            <p className="seven columns">{props.request.description}</p>
            <p className="two columns"><strong>${props.request.amount}.00</strong></p>
            {isDisabled ? (
                <p className="one column"><strong>PURCHASED</strong></p>
            ) : (
                <button 
                    disabled={isDisabled} 
                    className="three columns" 
                    onClick={() => handleClick(props.newFakeTot, props.request.amount)}>Buy</button>
            )}
        </div>
    )
}
