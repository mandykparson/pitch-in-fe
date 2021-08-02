import './App.css';
import './NavBar.css'
import { useState, useEffect } from 'react'
import MyAccount from './Components/MyAccount'
import Connections from './Components/Connections'
import Pitches from './Components/Pitches'
import Homepage from './Components/Homepage'
import {
  BrowserRouter as Router, 
  Route,
  Switch
} from 'react-router-dom'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import NavBar from './Components/NavBar'

function App() {

  const [navbarOpen, setNavbarOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginButtonPopup, setLogInButtonPopup] = useState(false);
  const [signupButtonPopup, setSignUpButtonPopup] = useState(false);
  const [user, setUser] = useState({})
  const [userBank, setUserBank] = useState('')
  const [banks, setBanks] = useState([])
  const [total, setTotal] = useState(1000)

  useEffect(() => {
    fetch('http://localhost:4000/banks')
      .then(response => response.json())
      .then(banksApi => setBanks(banksApi))
  }, [])

  return (
      <Router>
        <div className="header">
          <h3>Pitch In</h3>
          {isLoggedIn ? 
            <NavBar 
              navbarOpen={navbarOpen} 
              setNavbarOpen={setNavbarOpen}/>
            : <div className="login-signup-container">
                <button id="login" onClick={() => {setLogInButtonPopup(!loginButtonPopup)}}>Login</button> 
                  <Login 
                    trigger={loginButtonPopup} 
                    setLogInButtonPopup={setLogInButtonPopup}
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                    user={user}
                    setUser={setUser}/>
                <button id="signup" onClick={() => {setSignUpButtonPopup(!signupButtonPopup)}}>Sign Up</button> 
                  <SignUp 
                    trigger={signupButtonPopup} 
                    setSignUpButtonPopup={setSignUpButtonPopup}
                    />
              </div>}
          </div>
        <div className="main-content">
            <Switch>
                <Route exact path="/">
                    <Homepage 
                      user={user}
                    />
                </Route>
                <Route exact path="/myaccount">
                    <MyAccount 
                    user={user}
                    userBank={userBank}
                    setUserBank={setUserBank}
                    banks={banks}
                    total={total}
                    />
                </Route>
                <Route exact path="/connections">
                  <Connections 
                    user={user}
                  />
                </Route>
                <Route exact path="/pitches">
                    <Pitches 
                    user={user}
                    total={total}
                    />
                </Route>
            </Switch>
          </div>  
      </Router>
  );
}

export default App;
