import React from 'react'
import '../NavBar.css'
import { Link } from 'react-router-dom'

export default function NavBar(props) {

    const handleToggle = () => {
        props.setNavbarOpen(prev => !prev)
    }

    const closeMenu = () => {
        props.setNavbarOpen(false)
    }

    return (
        <nav className="navBar">
            <button onClick={ handleToggle }>{props.navbarOpen ? "Close" : "Menu"}</button>
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
    )
}