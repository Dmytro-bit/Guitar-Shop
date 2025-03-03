import React from "react"

import { Navigate, Link } from "react-router-dom";

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
            const {email, password} = this.state
            const data = {email:email, password:password}
            //Axios post request
            try{
                const res = await axios.post(`/auth/login`, data)
                console.log("Successfully logined")
                console.log(res)
                const {name, accessLevel, token} = res.data
                localStorage.setItem("token", token)
                localStorage.setItem("username", name)
                localStorage.setItem("accessLevel", accessLevel)

                this.setState({loggedInSuccessfully : true})

                console.log("User data saved to localStorage")


            }catch(err){
                console.log(err)
            }

        }

    }

    render() 
    {
        let formInputsState = this.validate()

        if (this.state.loggedInSuccessfully) {
            return <Navigate to="/" />;
        }

        return(
            <div className="login-bg">

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