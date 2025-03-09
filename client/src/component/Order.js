import React from "react"

import "../styles/order.scss"

class Order extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="order-container">
                <div className="order-container-header">
                    <p className="order-container-date">{this.props.created_at}</p>
                    <p className="order-container-paid">PAID : {this.props.paid ? "SUCCESS" : "FAIL"}</p>
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
                                <div className="order-item-rating-container">
                                    <img src="../img/star_border.png" className="order-rating-star-border" alt="rating"></img>
                                    <img src="../img/star_border.png" className="order-rating-star-border" alt="rating"></img>
                                    <img src="../img/star_border.png" className="order-rating-star-border" alt="rating"></img>
                                    <img src="../img/star_border.png" className="order-rating-star-border" alt="rating"></img>
                                    <img src="../img/star_border.png" className="order-rating-star-border" alt="rating"></img>
                                    <div
                                        className="order-item-rating-stars"
                                        style={{width: `calc(${item["product"].rating * 20}%`}}
                                    >
                                        <img src="../img/star.png" className="rating-star" alt="rating"></img>
                                        <img src="../img/star.png" className="rating-star" alt="rating"></img>
                                        <img src="../img/star.png" className="rating-star" alt="rating"></img>
                                        <img src="../img/star.png" className="rating-star" alt="rating"></img>
                                        <img src="../img/star.png" className="rating-star" alt="rating"></img>
                                    </div>
                                </div>
                                <div className="order-item-quantity-price-container">
                                    <p className="order-item-quantity">
                                        Quantity : {item["quantity"]}
                                    </p>
                                    <p className="order-item-price">
                                        Price : {item["product"].price}$
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="order-total-container">
                        <p className="order-total-title">Total: </p>
                        <p className="order-total">{this.props.total} $</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Order;