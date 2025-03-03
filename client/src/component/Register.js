import React from "react"
// import axios from "axios"

import { Navigate, Link } from "react-router-dom";

import "../styles/register.scss"
import axios from "axios";

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
                "password" : "Password must be at least 8-digits long and contains at least one lowercase letter, one uppercase letter, one digit and one special character",
                "confirmPassword" : "Passwords must match"
            },
            registrationSuccessfull : false,
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
        const pattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[£!#€$%^&*¬`@=)(-_:;'{}/\\ \[\].,<>?~|]).{8,}$/
        return pattern.test(String(this.state.password))
    }

    validatePhone = () =>
    {
        const pattern = /^\+3538\d\d{3,4}\d{4}$/;
        return pattern.test(String(this.state.phone))
    }

    validateName = () =>
    {
        const pattern =/^[a-zA-Z ]{2,30}$/;
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

    formData = () =>
    {
        return {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            password: this.state.password
        }
    }

    handleSubmit = async e =>
    {
        e.preventDefault()
        this.setState({wasSubmittedOnce : true})
        const formInputsState = this.validate();

        if (Object.keys(formInputsState).every(key => formInputsState[key]))
        {
            const inputs = this.formData()
            //Create axios post request
            try {
                const res = await axios.post(`auth/register`, inputs)
                if (res.status === 201){
                    const{name, token, accessLevel} = res.data

                    localStorage.setItem("token", token)
                    localStorage.setItem("username", name)
                    localStorage.setItem("accessLevel", accessLevel)

                    this.setState({ registrationSuccessfull : true })

                    console.log("Successfully registered and logined")
            }

            } catch (error) {
                console.log(error)
            }
        }

    }

    render()
    {
        const formInputsState = this.validate()

        if (this.state.registrationSuccessfull)
            return <Navigate to="/" />;

        return(
            <div className="register-bg">
            <div id="register-form-container"><Link to="/"><p id="register-back">&#8592; BACK</p></Link>
            <div id="register-container">
                <p id="register-heading">Register</p>
                <form id="register" onSubmit={this.handleSubmit}>
                    <>
                        <div className="register-cred-container">
                            <label htmlFor="name">Name:</label><br/>
                            <input type="text" id="register-name" name="name" onChange={this.handleChange} className={!formInputsState.name && this.state.wasSubmittedOnce ? 'invalid' : ''}></input><br/>
                        </div>
                        <div className="error">
                            {!formInputsState.name && this.state.wasSubmittedOnce &&
                            (
                                <i><p className="error-message">
                                    {this.state.errorMessage["name"]}
                                </p></i>
                            )}
                        </div>
                        <div className="register-cred-container">
                            <label htmlFor="email">Email:</label><br/>
                            <input type="text" id="register-email" name="email" onChange={this.handleChange} className={!formInputsState.email && this.state.wasSubmittedOnce ? 'invalid' : ''}></input><br/>
                        </div>
                        <div className="error">
                            {!formInputsState.email && this.state.wasSubmittedOnce &&
                            (
                                <i><p className="error-message">
                                    {this.state.errorMessage["email"]}
                                </p></i>
                            )}
                        </div>
                        <div className="register-cred-container">
                            <label htmlFor="phone">Phone:</label><br/>
                            <input type="text" id="register-phone" name="phone" onChange={this.handleChange} className={!formInputsState.phone && this.state.wasSubmittedOnce ? 'invalid' : ''}></input><br/>
                        </div>
                        <div className="error">
                            {!formInputsState.phone && this.state.wasSubmittedOnce &&
                            (
                                <i><p className="error-message">
                                    {this.state.errorMessage["phone"]}
                                </p></i>
                            )}
                        </div>
                        <div className="register-cred-container">
                            <label htmlFor="password">Password:</label><br/>
                            <input type="password" id="register-password" name="password" onChange={this.handleChange} className={!formInputsState.password && this.state.wasSubmittedOnce ? 'invalid' : ''}></input><br/>
                        </div>
                        <div className="error">
                            {!formInputsState.password && this.state.wasSubmittedOnce &&
                            (
                                <i><p className="error-message">
                                    {this.state.errorMessage["password"]}
                                </p></i>
                            )}
                        </div>
                        <div className="register-cred-container">
                            <label htmlFor="confirm-password">Confirm Password:</label><br/>
                            <input type="password" id="register-confirm-password" name="confirmPassword" onChange={this.handleChange} className={!formInputsState.confirmPassword && this.state.wasSubmittedOnce ? 'invalid' : ''}></input><br/>
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
            </div></div></div>
        )
    }
}

export default Register