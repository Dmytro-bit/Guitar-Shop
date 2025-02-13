import React from "react";
import { NavLink, Link } from "react-router-dom";
import "../styles/nav.scss";

class Nav extends React.Component {

    constructor(props)
    {
        super(props)
        
        this.state = {
            isMenuActive : false,
            isRegistered : false
        }
    }

    handleMenu = () => {
        this.setState({isMenuActive : !this.state.isMenuActive})
    }

    render() {
        return (
            <nav className="navbar-container">
                <Link to="/"><img src="../icons/logo.png" id="logo"/></Link>
                <ul className="navbar">
                    <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : "inactive"}>HOME</NavLink></li>
                    <li><NavLink to="/products" className={({ isActive }) => isActive ? "active" : "inactive"}>PRODUCTS</NavLink></li>
                    <li><NavLink to="/about" className={({ isActive }) => isActive ? "active" : "inactive"}>ABOUT</NavLink></li>
                </ul>
                <Link to={"/login"}><button id="signup-button" style={{display : this.state.isRegistered ? "none" : "flex"}}>SIGN UP</button></Link>
                <div id="icons-container" style={{display : this.state.isRegistered ? "flex" : "none"}}>
                    <div id="user-container">
                        <img src="../icons/user.png" id="profile-icon" className="icon" onClick={this.handleMenu}/>
                        <div id="dropdown" style={{display : this.state.isMenuActive ? "flex" : "none"}}>
                            <div className="dropdown-option"><b>ACCOUNT</b></div>
                            <hr />
                            <div className="dropdown-option"><b>ORDERS</b></div>
                            <hr />
                            <div className="dropdown-option" style={{color:"#db3d45"}}><b>LOG OUT</b></div>
                        </div>
                    </div>
                    <Link to="/cart"><img src="../icons/cart.png" id="cart-icon" className="icon"/></Link>
                </div>
            </nav>
        );
    }
}

export default Nav;
