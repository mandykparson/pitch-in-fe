import './App.css'
import './NavBar.css'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import NavBar from './Components/NavBar'
import LoginSignUp from './Components/LoginSignUp'
import Routes from './Components/Routes'

function App() {

  const [ navbarOpen, setNavbarOpen ] = useState(false)
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [ user, setUser ] = useState({})
  const [ total ] = useState(1000)

  return (
      <Router>
        <div className="header">
          <h3>Pitch In</h3>
          {isLoggedIn ? 
            <NavBar 
              navbarOpen={navbarOpen} 
              setNavbarOpen={setNavbarOpen}/>
            : 
            <LoginSignUp 
              user={user}
              setUser={setUser}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />}
          </div>
        <div className="main-content">
          <Routes 
            user={user}
            total={total}/>
        </div>  
      </Router>
  );
}

export default App;
