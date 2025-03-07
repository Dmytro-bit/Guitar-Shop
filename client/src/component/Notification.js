import React from "react"

import "../styles/notification.scss"

class Notification extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            isVisible: true,
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ isVisible: false });
        }, 3000);

        setTimeout(() => {
            this.props.onClose();
        }, 3500);
    }

    render() {
        return (
            <div className={`notification-container ${this.state.isVisible ? "fade-in" : "fade-out"}`}>
                <div className="notification-close-container">
                    <img src="../icons/close.png" className="notification-close" onClick={() => {this.props.onClose()}} />
                </div>
                <p className="notification-text">{this.props.message}</p>
            </div>
        )
    }
}

export default Notification
