import { useState } from 'react'
import Login from './Login'
import SignUp from './SignUp'

export default function LoginSignUp(props) {

    const [ loginButtonPopup, setLogInButtonPopup ] = useState(false);
    const [ signupButtonPopup, setSignUpButtonPopup ] = useState(false);

    return (
        <div className="login-signup-container">
            <button id="login" onClick={() => {setLogInButtonPopup(!loginButtonPopup)}}>Login</button> 
                <Login 
                trigger={loginButtonPopup} 
                setLogInButtonPopup={setLogInButtonPopup}
                isLoggedIn={props.isLoggedIn}
                setIsLoggedIn={props.setIsLoggedIn}
                user={props.user}
                setUser={props.setUser}/>
            <button id="signup" onClick={() => {setSignUpButtonPopup(!signupButtonPopup)}}>Sign Up</button> 
                <SignUp 
                trigger={signupButtonPopup} 
                setSignUpButtonPopup={setSignUpButtonPopup}/>
        </div>
    )
}
