import './App.css';
import './NavBar.css'
import NavBar from './Components/NavBar'
import { useState } from 'react'
import MyAccount from './Components/MyAccount'
import Connections from './Components/Connections'
import Pitches from './Components/Pitches'
import Homepage from './Components/Homepage'
import {
  BrowserRouter as Router, 
  Route,
  Link,
  Switch
} from 'react-router-dom'
import { MdClose } from "react-icons/md"
import { FiMenu } from "react-icons/fi"

function App() {

  const [navbarOpen, setNavbarOpen] = useState(false)

  const handleToggle = () => {
    setNavbarOpen(prev => !prev)
  }

  const closeMenu = () => {
    setNavbarOpen(false)
  }

  return (
      <Router>
        <div className="header">
          <h2>Pitch In</h2>
          <nav className="navBar">
            <button className="hamburger" onClick={handleToggle}>{navbarOpen ? 
              (<MdClose style={{ color: "#fff", width: "40px", height: "40px" }} />) : 
              (<FiMenu style={{ color: "#7b7b7b", width: "40px", height: "40px" }} />
              )}
            </button>
              <ul className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>
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
        </div>
        <div className="main-content">
          <Switch>
              <Route exact path="/home">
                  <Homepage />
              </Route>
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
        </div>
      </Router>
  );
}

export default App;
