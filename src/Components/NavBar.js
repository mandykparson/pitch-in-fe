import React from 'react'
import '../NavBar.css'
import MyAccount from './MyAccount'
import Connections from './Connections'
import Pitches from './Pitches'
import {
    BrowserRouter as Router, 
    Route,
    Link,
    Switch
} from 'react-router-dom'

export default function NavBar(props) {

    const handleToggle = () => {
        props.setNavbarOpen(prev => !prev)
    }

    const closeMenu = () => {
        props.setNavbarOpen(false)
    }

    return (
        <Router>
            <nav className="navBar">
                <button onClick={ handleToggle }>{props.navbarOpen ? "Close" : "Open"}</button>
                <ul className={`menuNav ${props.navbarOpen ? " showMenu" : ""}`}>
                    <li>
                        <Link 
                            to="/home"
                            activeClassName="active-link"
                            onClick={() => closeMenu()}
                            exact> 
                                Home
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/myaccount"
                            activeClassName="active-link"
                            onClick={() => closeMenu()}
                            exact> 
                                My Account
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/connections"
                            activeClassName="active-link"
                            onClick={() => closeMenu()}
                            exact>
                                Connections
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/pitches"
                            activeClassName="active-link"
                            onClick={() => closeMenu()}
                            exact>
                                Pitches
                        </Link>
                    </li>
                </ul>
            </nav>

            <Switch>
                <Route exact path="/myaccount">
                    <MyAccount />
                </Route>
                <Route exact path="/connections">
                    <Connections />
                </Route>
                <Route exact path="/pitches">
                    <Pitches />
                </Route>
            </Switch>

        </Router>
    )
}