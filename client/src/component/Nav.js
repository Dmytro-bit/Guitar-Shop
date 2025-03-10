import React from "react";
import {NavLink, Link} from "react-router-dom";

import Account from "./Account"

import "../styles/nav.scss";

class Nav extends React.Component {

    constructor(props)
    {
        super(props)

        this.state = {
            isMenuActive : false,
            isRegistered : false,
            isUserAccountActive : false,
            isAdmin : false,
        }
    }

    componentDidMount = () =>
    {
        const token = localStorage.getItem("token");
        console.log(token)
        token === "null"? this.setState({isRegistered : false}) : this.setState({isRegistered : true})
        this.setState({isAdmin : localStorage.getItem("accessLevel") === "2"});
    }

    showMobileNavBar = () => {
        let navbar = document.querySelector(".navbar-mobile")
        if (navbar.style.display == "flex")
            navbar.style.display = "none"
        else
            navbar.style.display = "flex"
    }

    handleMenu = () => {
        this.setState({isMenuActive : !this.state.isMenuActive})
    }

    handleUserAccount = () =>
    {
        this.setState({isUserAccountActive : !this.state.isUserAccountActive})
        this.setState({isMenuActive : false})
        // console.log(this.state.isUserAccountActive)
    }

    handleLogOut = () =>
    {
        localStorage.removeItem("token")
        localStorage.removeItem("name")
        localStorage.removeItem("accessLevel")
        localStorage.removeItem("email")
        localStorage.removeItem("profilePhoto")
        const orderAddress =
            {
                fline: "",
                sline: "",
                city: "",
                county: "",
                eircode: "",
            }
        localStorage.setItem("orderAddress", JSON.stringify(orderAddress));
        localStorage.setItem("shopping_cart", JSON.stringify([]));
        this.setState({isRegistered : false})
        window.location.reload(false); //refresh the page
    }

    render() {

        return (
            <><nav className="navbar-container">
                <Link to="/" id="logo-link"><img src="../icons/logo.png" id="logo"/></Link>
                <div id="navbar-mobile-menu"><img src="../icons/menu.png" className="menu-icon" onClick={this.showMobileNavBar}/></div>
                <ul className="navbar">
                    <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : "inactive"}>HOME</NavLink></li>
                    <li><NavLink to="/products" className={({ isActive }) => isActive ? "active" : "inactive"}>PRODUCTS</NavLink></li>
                    <li><NavLink to="/about" className={({ isActive }) => isActive ? "active" : "inactive"}>ABOUT</NavLink></li>
                </ul>
                <div className="logo-mobile"><b>GUITAR HERO</b></div>
                <Link to={"/login"} style={{display : this.state.isRegistered ? "none" : "flex"}} id="signup-button-link"><button id="signup-button">SIGN UP</button></Link>
                <div id="icons-container" style={{display : this.state.isRegistered ? "flex" : "none"}}>
                    <div id="user-container">
                        <img src="../icons/user.png" id="profile-icon" className="icon" onClick={this.handleMenu}/>
                        <div id="dropdown" style={{display : this.state.isMenuActive ? "flex" : "none"}}>
                            <div className="dropdown-option" onClick={this.handleUserAccount}><b>ACCOUNT</b></div>
                            <hr />
                            {this.state.isAdmin ?
                                (<Link to="/users" className="dropdown-option"><b>USERS</b></Link>)
                                :
                                (<Link to="/orders" className="dropdown-option"><b>ORDERS</b></Link>)}
                            <hr />
                            <div className="dropdown-option" style={{color:"#db3d45"}} onClick={this.handleLogOut}><b>LOG OUT</b></div>
                        </div>
                    </div>
                    <Link to="/cart"><img src="../icons/cart.png" id="cart-icon" className="icon"/></Link>
                </div>
            </nav>

            <Account isActive={this.state.isUserAccountActive} handleClose={this.handleUserAccount}/>

            <ul className="navbar-mobile">
            <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : "inactive"}>HOME</NavLink></li>
            <li><NavLink to="/products" className={({ isActive }) => isActive ? "active" : "inactive"}>PRODUCTS</NavLink></li>
            <li><NavLink to="/about" className={({ isActive }) => isActive ? "active" : "inactive"}>ABOUT</NavLink></li>
        </ul></>
        );
    }
}

export default Nav;
