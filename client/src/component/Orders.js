import React from "react"
import {Link} from "react-router-dom";

class Orders extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="orders-container">
                <div className="orders-content">
                    <Link to="/products" className="back">←BACK</Link>
                    <div className="order-title-container">
                        <p className="order-title">Shopping Cart</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Orders