import React from "react";

import "../styles/card.scss"
import { Link } from "react-router-dom";

class Card extends React.Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            images : ["../img/guitar-test.png", ""],
            name: "Fender 70th Anniversary Stratocaster",
            chars: {"Shape" : "Stratocaster", "Strings" : "6", "Frets" : "22", "Body" : "Mahogany", "Pickups" : "Single"},
            price : 599.99,
            inStock : true,
        }
    }

    render()
    {
        return(
            // <div className="card-container">
            //     <div className="image-container">
            //         <img src={this.state.images[0]} alt="guitar" className="card-img"/>
            //     </div>
            //     <div className="card-content-container">
            //         <div className="card-heading-container">
            //             <p className="card-heading">{this.state.name}</p>
            //             <img src="../icons/heart.png" alt="favourite" className="favourite-icon"/>
            //         </div>
            //         <div className="card-description-container">
            //             {
            //                 //Write logic to check if there are enough characteristics
            //                 Object.entries(this.state.chars).slice(0, 5).map(([key, value], index) =>
            //                 (
            //                     <p key={index}>{key} : {value}</p>
            //                 ))
            //             }
            //         </div>
            //         <div className="card-footer-container">
            //             <div className="card-footer">
            //                 <p>{this.state.price} | <span style={{color : this.state.inStock ? "green" : "red" }}>{this.state.inStock ? "in Stock" : "Not in Stock"}</span></p>
            //                 {/* make Button unclickable if not in stock  */}
            //                 <button className="card-but-button">BUY</button>
            //             </div>
            //         </div>
            //     </div>
            // </div>
            <div className="card-container">
                <div className="card-content-container">
                    <div className="card-image-container">
                        <Link to="/" className="card-image-link"><img src={this.state.images[0]} className="card-image"/></Link>
                    </div>
                    <div className="card-main-container">
                        <div className="card-description">
                            <div className="card-name">
                                {this.state.name}
                                <img src="../icons/heart.png" className="heart-icon"/>
                            </div>
                            <div className="card-characteristics">
                                <ul className="characteristics-list">
                                {Object.entries(this.state.chars)
                                    .slice(0, 5) // Take only the first 5 elements
                                    .map(([key, value], index) => (
                                    <li key={index}><strong>{key}:</strong> {value}</li>
                                    ))
                                 }
                                </ul>
                            </div>
                            <div className="card-price-container">
                                <div className="card-price">
                                    <p className="price">${this.state.price}</p>
                                    <p style={{ color : this.state.inStock ? "green" : "red"}} className="inStock">{this.state.inStock ? "In Stock" : "Not In Stock"}</p>
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