import React from 'react';

import "../styles/footer.scss"
import {Link} from "react-router-dom";

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <footer className="footer-container">
                <div className="socialmedia-icons-container">
                    <div className="socialmedia-icon-border">
                        <img className="socialmedia-icon" src="../icons/facebook.png" alt="facebook"/>
                    </div>
                    <div className="socialmedia-icon-border">
                        <img className="socialmedia-icon" src="../icons/instagram.png" alt="instagram"/>
                    </div>
                    <div className="socialmedia-icon-border">
                        <img className="socialmedia-icon" src="../icons/twitter.png" alt="twitter"/>
                    </div>
                    <div className="socialmedia-icon-border">
                        <img className="socialmedia-icon" src="../icons/google-plus.png" alt="g+"/>
                    </div>
                    <div className="socialmedia-icon-border">
                        <img className="socialmedia-icon" src="../icons/youtube.png" alt="youtube"/>
                    </div>
                </div>
                <div className="footer-nav-container">
                    <div className="footer-nav">
                        <Link to="/" className="footer-nav-element">HOME</Link>
                        <p className="footer-nav-element-separator">&#x2022;</p>
                        <Link to="/products" className="footer-nav-element">PRODUCTS</Link>
                        <p className="footer-nav-element-separator">&#x2022;</p>
                        <Link to="about" className="footer-nav-element">ABOUT US</Link>
                    </div>
                </div>
                <div className="copyright">
                    Copyright &copy;{(new Date().getFullYear())}; Designed By &nbsp;<b>Guitar Hero Co.</b>
                </div>
            </footer>
        )
    }
}

export default Footer;