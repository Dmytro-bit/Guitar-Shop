import React from "react"

import { Link } from "react-router-dom";

import "../login.scss"

class Login extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    render() 
    {
        return(
            /// TODO: Change CSS hover for this button 
            <><Link to="/"><p id="login-back">&#8592; BACK</p></Link>
            <div id="login-container">
                <p id="login-heading">Login</p>
                <form id="login">
                    <>
                        <div className="login-cred-container">
                            <label htmlFor="email">Email:</label><br/>
                            <input type="text" id="login-email" name="login-email"></input><br/>
                        </div>
                        <div className="login-cred-container">
                            <label htmlFor="password">Password:</label><br/>
                            <input type="text" id="login-password" name="login-password"></input><br/>
                        </div>
                    </>
                    <input type="submit" value="SIGN IN"/>
                </form>
                <div id="register-text-container"><p id="register-text">Don't have an account yet? <Link id="register-link" to="/register">Register</Link></p></div>
            </div></>
        )
    }
}

export default Login