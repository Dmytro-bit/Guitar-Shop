import React from "react"

import { Link } from "react-router-dom";

import "../register.scss"

class Register extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    render() 
    {
        return(
            <><Link to="/"><p id="login-back">&#8592; BACK</p></Link>
            <div id="register-container">
                <p id="login-heading">Register</p>
                <form id="register">
                    <>
                        <div className="login-cred-container">
                            <label htmlFor="name">Name:</label><br/>
                            <input type="text" id="login-name" name="login-name"></input><br/>
                        </div>
                        <div className="login-cred-container">
                            <label htmlFor="email">Email:</label><br/>
                            <input type="text" id="login-email" name="login-email"></input><br/>
                        </div>
                        <div className="login-cred-container">
                            <label htmlFor="phone">Phone:</label><br/>
                            <input type="text" id="login-phone" name="login-phone"></input><br/>
                        </div>
                        <div className="login-cred-container">
                            <label htmlFor="password">Paswword:</label><br/>
                            <input type="text" id="login-password" name="login-password"></input><br/>
                        </div>
                        <div className="login-cred-container">
                            <label htmlFor="confirm-password">Confirm Paswword:</label><br/>
                            <input type="text" id="login-confirm-password" name="login-confirm-password"></input><br/>
                        </div>
                    </>
                    <input type="submit" value="SIGN UP"/>
                </form>
            </div></>
        )
    }
}

export default Register