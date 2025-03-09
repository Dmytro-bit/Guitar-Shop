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
                <p className={`notification-text ${this.props.type}`}>{this.props.message}</p>
            </div>
        )
    }
}

export default Notification
