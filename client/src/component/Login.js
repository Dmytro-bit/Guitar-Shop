import React from "react"

import { Link, Navigate } from "react-router-dom";
import Notification from "./Notification";

import "../styles/login.scss"
import axios from "axios";

class Login extends React.Component
{
    constructor(props)
    {
        super(props)

        this.state = 
        {
            email: "",
            password: "",
            wasSubmittedOnce : false,
            errorMessage: {"email" : "Enter a valid email",
                            "password" : "Password can not be an empty string"
            },
            loggedInSuccessfully : false,
            loginResponseError : "",
            showNotifications: false,
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
        return this.state.password.length > 0;
    }

    validate = () =>
    {
        return {
            email: this.validateEmail(),
            password: this.validatePassword()
        }
    }

    handleSubmit = async e =>
    {
        e.preventDefault()
        this.setState({wasSubmittedOnce : true})
        const formInputsState = this.validate()

        if(Object.keys(formInputsState).every(key => formInputsState[key]))
        {
            try{
                const {email, password} = this.state
                const data = {email:email, password:password}
                const res = await axios.post(`/auth/login`, data)
                console.log("Successfully logined")
                console.log(res)
                const accessLevel = res.data.accessLevel;
                const token = res.data.token;
                const resultEmail = res.data.email
                console.log(accessLevel)
                console.log(token)
                console.log(resultEmail)
                localStorage.setItem("token", token)
                localStorage.setItem("email", resultEmail)
                localStorage.setItem("accessLevel", accessLevel)
                const orderAddress =
                    {
                        fline: "",
                        sline: "",
                        city: "",
                        county: "",
                        eircode: "",
                    }
                localStorage.setItem("isAddressSet", "false");


                localStorage.setItem("shopping_cart", JSON.stringify([]));
                localStorage.setItem("orderAddress", JSON.stringify(orderAddress))
                this.setState({loggedInSuccessfully: true})

                console.log("User data saved to localStorage")


            }catch(err){
                this.setState({loginResponseError : err.message, showNotifications: true})
                console.log("this error ", err.message)
            }

        }
    }

    closeNotification = () => {
        this.setState({ showNotifications: false });
    };

    render() 
    {
        let formInputsState = this.validate()

        if (this.state.loggedInSuccessfully) {
            return <Navigate to="/" />;
        }

        return(
            <div className="login-bg">
                {this.state.showNotifications && (
                    <Notification
                        message={this.state.loginResponseError}
                        type={"error"}
                        onClose={this.closeNotification}
                    />
                )}
            <div id="login-form-container"><Link to="/"><p id="login-back">&#8592; BACK</p></Link>
            <div id="login-container">
                <p id="login-heading">Login</p>
                <form id="login" onSubmit={this.handleSubmit}>
                    <>
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
                    </>
                    <input type="submit" value="SIGN IN"/>
                </form>
                <div id="register-text-container"><p id="register-text">Don't have an account yet? <Link id="register-link" to="/register">Register</Link></p></div>
            </div>
            </div></div>
        )
    }
}

export default Login