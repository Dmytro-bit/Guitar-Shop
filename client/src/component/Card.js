import React from "react";

import "../styles/card.scss"
import { Link } from "react-router-dom";

class Card extends React.Component
{
    constructor(props)
    {
        super(props)

    }

    render()
    {
        return(
            <div className="card-container">
                <div className="card-content-container">
                    <div className="card-image-container">
                        <Link to="/" className="card-image-link"><img src={this.props.images[0]} className="card-image"/></Link>
                    </div>
                    <div className="card-main-container">
                        <div className="card-description">
                            <div className="card-name">
                                {this.props.name}
                                <img src="../icons/heart.png" className="heart-icon"/>
                            </div>
                            <div className="card-characteristics">
                                <ul className="characteristics-list">
                                {Object.entries(this.props.chars)
                                    .slice(0, 5) // Take only the first 5 elements
                                    .map(([key, value], index) => (
                                    <li key={index}><strong>{key}:</strong> {value}</li>
                                    ))
                                 }
                                </ul>
                            </div>
                            <div className="card-price-container">
                                <div className="card-price">
                                    <p className="price">${this.props.price}</p>
                                    <p style={{ color : this.props.inStock ? "green" : "red"}} className="inStock">{this.props.inStock ? "In Stock" : "Not In Stock"}</p>
                                </div>
                                <button className="card-buy-button">BUY</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Card