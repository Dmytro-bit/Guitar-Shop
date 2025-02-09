import React from "react"
// import axios from "axios"

import { Link } from "react-router-dom";

import "../register.scss"

class Register extends React.Component
{
    constructor(props)
    {
        super(props)

        this.state = 
        {
            wasSubmittedOnce : false,
            name: "",
            email : "",
            password: "",
            phone: "",
            confirmPassword: "",
            errorMessage: {
                "name" : "Name must be between 2 and 30 characters long ",
                "email" : "Enter valid email address",
                "phone" : "Phone number should start with a country code (+353). No spaces allowed",
                "password" : "Password must be at least 8-digits long and contains at least one lowercase letter, one uppercase letter, one digit and one of the following characters (£!#€$%^&*)",
                "confirmPassword" : "Passwords must match"
            } 
        }
    }

    handleChange = e =>
    {
        this.setState({ [e.target.name] : e.target.value })
    }

    validateEmail = () =>
    {
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(String(this.state.email).toLowerCase())
    }

    validatePassword = () =>
    {
        const pattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[£!#€$%^&*]).{8,}$/
        return pattern.test(String(this.state.password)) 
    }

    validatePhone = () =>
    {
        const pattern = /^\+3538\d\d{3,4}\d{4}$/;
        return pattern.test(String(this.state.phone))
    }

    validateName = () =>
    {
        const pattern =/^[a-zA-Z0-9_ ]{2,30}$/;
        return pattern.test(String(this.state.name))
    } 

    validateConfirmPassword = () =>
    {
        return ((this.state.confirmPassword.length > 0) && (this.state.password === this.state.confirmPassword))
    }

    validate = () =>
    {
        return {
            name: this.validateName(),
            email: this.validateEmail(),
            phone: this.validatePhone(),
            password: this.validatePassword(),
            confirmPassword: this.validateConfirmPassword()
        }
    }

    handleSubmit = e =>
    {
        e.preventDefault()
        this.setState({wasSubmittedOnce : true})
        const formInputsState = this.validate();

        if (Object.keys(formInputsState).every(key => formInputsState[key])) 
        {
            //Create axios post request 
        }
        else
        {
            return  
        }
    }

    render() 
    {
        const formInputsState = this.validate()
        return(
            <div id="register-form-container"><Link to="/"><p id="login-back">&#8592; BACK</p></Link>
            <div id="register-container">
                <p id="login-heading">Register</p>
                <form id="register" onSubmit={this.handleSubmit}>
                    <>
                        <div className="login-cred-container">
                            <label htmlFor="name">Name:</label><br/>
                            <input type="text" id="login-name" name="name" onChange={this.handleChange} className={!formInputsState.name && this.state.wasSubmittedOnce ? 'invalid' : ''}></input><br/>
                        </div>
                        <div className="error">
                            {!formInputsState.name && this.state.wasSubmittedOnce &&
                            (
                                <i><p className="error-message">
                                    {this.state.errorMessage["name"]}
                                </p></i>
                            )}
                        </div>
                        <div className="login-cred-container">
                            <label htmlFor="email">Email:</label><br/>
                            <input type="text" id="login-email" name="email" onChange={this.handleChange} className={!formInputsState.email && this.state.wasSubmittedOnce ? 'invalid' : ''}></input><br/>
                        </div>
                        <div className="error">
                            {!formInputsState.email && this.state.wasSubmittedOnce &&
                            (
                                <i><p className="error-message">
                                    {this.state.errorMessage["email"]}
                                </p></i>
                            )}
                        </div>
                        <div className="login-cred-container">
                            <label htmlFor="phone">Phone:</label><br/>
                            <input type="text" id="login-phone" name="phone" onChange={this.handleChange} className={!formInputsState.phone && this.state.wasSubmittedOnce ? 'invalid' : ''}></input><br/>
                        </div>
                        <div className="error">
                            {!formInputsState.phone && this.state.wasSubmittedOnce &&
                            (
                                <i><p className="error-message">
                                    {this.state.errorMessage["phone"]}
                                </p></i>
                            )}
                        </div>
                        <div className="login-cred-container">
                            <label htmlFor="password">Password:</label><br/>
                            <input type="password" id="login-password" name="password" onChange={this.handleChange} className={!formInputsState.password && this.state.wasSubmittedOnce ? 'invalid' : ''}></input><br/>
                        </div>
                        <div className="error">
                            {!formInputsState.password && this.state.wasSubmittedOnce &&
                            (
                                <i><p className="error-message">
                                    {this.state.errorMessage["password"]}
                                </p></i>
                            )}
                        </div>
                        <div className="login-cred-container">
                            <label htmlFor="confirm-password">Confirm Password:</label><br/>
                            <input type="password" id="login-confirm-password" name="confirmPassword" onChange={this.handleChange} className={!formInputsState.confirmPassword && this.state.wasSubmittedOnce ? 'invalid' : ''}></input><br/>
                        </div>
                        <div className="error">
                            {!formInputsState.confirmPassword && this.state.wasSubmittedOnce &&
                            (
                                <i><p className="error-message">
                                    {this.state.errorMessage["confirmPassword"]}
                                </p></i>
                            )}
                        </div>
                    </>
                    <input type="submit" value="SIGN UP"/>
                </form>
            </div></div>
        )
    }
}

export default Register