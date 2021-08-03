import { useState, useEffect } from 'react'
import Homepage from './Homepage'
import MyAccount from './MyAccount'
import Pitches from './Pitches'
import { Route, Switch } from 'react-router-dom'

export default function Routes(props) {

    const [ banksURL ] = useState('http://localhost:4000/banks')
    const [ userBank, setUserBank ] = useState('')
    const [ banks, setBanks ] = useState([])

    useEffect(() => {
        fetch(banksURL)
            .then(response => response.json())
            .then(banksApi => setBanks(banksApi))
    }, [])

    return (
        <Switch>
            <Route exact path="/">
                <Homepage user={props.user}/>
            </Route>
            <Route exact path="/myaccount">
                <MyAccount 
                    user={props.user}
                    userBank={userBank}
                    setUserBank={setUserBank}
                    banks={banks}
                    total={props.total}/>
            </Route>
            <Route exact path="/pitches">
                <Pitches 
                    user={props.user} 
                    total={props.total}/>
            </Route>
        </Switch>
    )
}
