import React from "react"

import "../styles/approvalModal.scss"

class ApprovalModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <><div className="modal-bg"></div>
            <div className="approval-modal-container">
                <p className="approval-modal-text">{this.props.text}</p>
                <div className="approval-modal-buttons-container">
                    <button className={`approval-modal-button ${this.props.color}`} onClick={this.props.handleClick}>CONFIRM</button>
                    <button className={`approval-modal-button`} onClick={this.props.handleClose}>CANCEL</button>
                </div>
            </div></>
        )
    }
}
export default ApprovalModal;