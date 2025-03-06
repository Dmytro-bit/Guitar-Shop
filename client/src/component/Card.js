import React from "react";

import "../styles/card.scss"
import {Link} from "react-router-dom";

class Card extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="card-container">
                <div className="card-content-container">
                    <div className="card-image-container">
                        <Link to={`/products/${this.props._id}`} className="card-image-link"><img
                            src={this.props.images[0]} className="card-image"/></Link>
                    </div>
                    <div className="card-main-container">
                        <div className="card-description">
                            <div className="card-name">
                                <Link to={`/products/${this.props._id}`}
                                      style={{color: "black", textDecoration: "none"}}>{this.props.name}
                                </Link>
                                <img src="../icons/heart.png" className="heart-icon"/>
                            </div>
                            <Link to={`/products/${this.props._id}`}
                                  className="card-characteristics"
                                  style={{color: "black", textDecoration: "none"}}>
                                <ul className="characteristics-list">
                                    {Object.entries(this.props.parameters)
                                        .slice(0, 5)
                                        .map(([key, value], index) => (
                                            <li key={index}><strong>{key}:</strong> {value}</li>
                                        ))
                                    }
                                </ul>
                            </Link>
                            <div className="card-price-container">
                                <div className="card-price">
                                    <p className="price">${this.props.price}</p>
                                    <p style={{color: this.props.inStock ? "green" : "red"}}
                                       className="inStock">{this.props.inStock ? "In Stock" : "Not In Stock"}</p>
                                </div>
                                <button className="card-buy-button">ADD TO CART</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Card