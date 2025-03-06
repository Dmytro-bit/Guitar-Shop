import React from 'react';

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <footer className="footer-container">
                <div className="socialmedia-icnos-container">
                    <div className="socialmedia-icon-border">
                        <img src="../icons/facebbok.png" alt="facebbok"/>
                    </div>
                    <div className="socialmedia-icon-border">
                        <img src="../icons/isntagram.png" alt="isntagram"/>
                    </div>
                    <div className="socialmedia-icon-border">
                        <img src="../icons/twitter.png" alt="twitter"/>
                    </div>
                    <div className="socialmedia-icon-border">
                        <img src="../icons/google-plus.png" alt="g+"/>
                    </div>
                    <div className="socialmedia-icon-border">
                        <img src="../icons/youtube.png" alt="youtube"/>
                    </div>
                </div>
                <div className="footer-nav-container">
                    <div className="footer-nav">
                        <p className="footer-nav-element">HOME</p>
                        <p className="footer-nav-element">PRODUCTS</p>
                        <p className="footer-nav-element">ABOUT US</p>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer;