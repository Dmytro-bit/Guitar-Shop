import React from "react"

class Order extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {
        return (
            <div className="order-container">
                <div className="order-container-header">
                    <p className="order-container-date">{this.props.created_at}</p>
                    <p className="order-container-paid">PAID : {this.props.paid}</p>
                </div>
                <div className="order-content-container">
                    {this.props.items.map((item, index) => (
                        <div className="order-item-container" key={index}>
                            <div className="order-item-image-container">
                                <img src={item["product"].images[0]} alt="order product image" className="order-item-image"/>
                            </div>
                            <div className="order-item-main-container">
                                <div className="order-item-name-container">
                                    <p className="order-item-name">
                                        {item["product"].name}
                                    </p>
                                </div>
                                <div className="order-item-quantity-container">
                                    <p className="order-item-quantity">
                                        Quantity : {item["quantity"]}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="order-total-container">
                        <div className="order-total">
                            <p className="order-total">{this.props.total}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Order;