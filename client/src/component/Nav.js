import React from "react";
import { NavLink, Link } from "react-router-dom";
import "../nav.scss";

class Nav extends React.Component {
    render() {
        return (
            <nav className="navbar-container">
                <Link to="/"><img src="../icons/logo.png" id="logo"/></Link>
                <ul className="navbar">
                    <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : "inactive"}>HOME</NavLink></li>
                    <li><NavLink to="/products" className={({ isActive }) => isActive ? "active" : "inactive"}>PRODUCTS</NavLink></li>
                    <li><NavLink to="/about" className={({ isActive }) => isActive ? "active" : "inactive"}>ABOUT</NavLink></li>
                </ul>
                <Link to="/profile"><img src="../icons/user.png" id="profile-icon"/></Link>
            </nav>
        );
    }
}

export default Nav;
