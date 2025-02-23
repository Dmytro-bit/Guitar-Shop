import React from "react";
import { useParams } from "react-router-dom";

import Nav from "./Nav";
import "../styles/product.scss"

function withParams(Component) {
    return (props) => <Component {...props} params={useParams()} />;
}

class Products extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            product : {
                images: ["../img/ibanezTest.jpg", "../img/fenderTest.jpeg"],
                name: "Fender 70th Anniversary Stratocaster",
                price: 599,
                inStock: true,
                chars: {
                    Shape: "Stratocaster",
                    Strings: "6",
                    Frets: "22",
                    Body: "Mahogany",
                    Pickups: "Single"
                }
            },
            currImage: 0,
        }
    }

    render() {
        const { name } = this.props.params;
        return(
            <><Nav />
            <div className="product-container">
                <div className="product-header">
                    <p>← BACK</p>
                </div>
                <div className="product-left">
                    <div className="product-images-container">
                        <img
                            src={(this.state.product.images.filter((img,index) => index === this.state.currImage))}
                            className="product-image"></img>
                        <img src="../img/right-arrow.png" alt="arrow" className="product-image-arrow" id="product-image-arrow-left"/>
                        <img src="../img/right-arrow.png" alt="arrow" className="product-image-arrow" id="product-image-arrow-right"/>
                    </div>
                    <div className="product-chars">
                        <p className="product-chars-title">Description</p>
                        <ul className="product-chars-list">
                            {Object.entries(this.state.product.chars)
                                .map(([key, value], index) => (
                                    <li className="product-chars-list-element" key={index}><p className="product-chars-list-element-key"><strong>{key}:</strong></p> <p className="product-chars-list-element-value">{value}</p></li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div className="product-right">
                    <div className="product-name"></div>
                    <div className="product-price"></div>
                    <div className="product-details"></div>
                    <div className="product-rating"></div>
                    <div className="product-controls">
                        <div className="product-quantity"></div>
                        <div className="product-buy"></div>
                        <div className="product-icons">
                            <img src="../icons/cart.png" alt="cart"></img>
                            <img src="../icons/heart.png" alt="favourite"></img>
                        </div>
                    </div>
                </div>
            </div></>
        )
    }
}

export default withParams(Products);