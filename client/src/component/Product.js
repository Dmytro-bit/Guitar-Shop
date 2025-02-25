import React from "react";
import {Link} from "react-router-dom";
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
                rating: 3.5,
                inStock: true,
                quantity: 10,
                chars: {
                    Shape: "Stratocaster",
                    Strings: "6",
                    Frets: "22",
                    Body: "Mahogany",
                    Pickups: "Single"
                }
            },
            currImage: 0,
            quantity: 1,
        }
    }

    scrollImageForward = () =>
    {
        this.state.currImage >= this.state.product.images.length - 1 ? this.setState({currImage : 0}) : this.setState({currImage: this.state.currImage + 1});
        console.log(this.state.currImage);
    }

    scrollImageBackward = () =>
    {
        this.state.currImage <= 0 ? this.setState({currImage : this.state.product.images.length - 1}) : this.setState({currImage: this.state.currImage - 1});
        console.log(this.state.currImage);
    }

    handleQuantityIncrease = () =>
    {
        if(this.state.quantity < this.state.product.quantity)
            this.setState({quantity : this.state.quantity + 1});
    }

    handleQuantityDecrease = () =>
        {
            if(this.state.quantity > 1)
                this.setState({quantity : this.state.quantity - 1});
        }

    render() {
        const { name } = this.props.params;
        return(
            <><Nav />
            <div className="product-container">
                <div className="product-header">
                    <Link className="back-to-products-link" to="/products">← BACK</Link>
                </div>
                <div className="product-left">
                    <div className="product-images-container">
                        <img
                            src={(this.state.product.images.filter((img,index) => index === this.state.currImage))}
                            alt="instrument"
                            className="product-image"></img>
                        <img src="../img/right-arrow.png" alt="arrow" className="product-image-arrow" id="product-image-arrow-left" onClick={this.scrollImageBackward}/>
                        <img src="../img/right-arrow.png" alt="arrow" className="product-image-arrow" id="product-image-arrow-right" onClick={this.scrollImageForward}/>
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
                    <div className="product-name">{this.state.product.name}</div>
                    <div className="product-price">{this.state.product.price}<span>$</span></div>
                    <div className="product-details">
                        <p className="product-shipping">Free Shipping</p>
                        <p 
                            className="product-stock"
                            style={{color: this.state.product.inStock ? "green" : "red"}}
                            >{this.state.product.inStock ? "In Stock" : "Not In Stock"}</p>
                    </div>
                    <div className="product-rating">
                        <img src="../img/star_border.png" className="rating-star-border" alt="rating"></img>
                        <img src="../img/star_border.png" className="rating-star-border" alt="rating"></img>
                        <img src="../img/star_border.png" className="rating-star-border" alt="rating"></img>
                        <img src="../img/star_border.png" className="rating-star-border" alt="rating"></img>
                        <img src="../img/star_border.png" className="rating-star-border" alt="rating"></img>
                        <div 
                            className="product-rating-stars"
                            style={{width: `calc(${this.state.product.rating * 20}%`}}
                            >
                            <img src="../img/star.png" className="rating-star" alt="rating"></img>
                            <img src="../img/star.png" className="rating-star" alt="rating"></img>
                            <img src="../img/star.png" className="rating-star" alt="rating"></img>
                            <img src="../img/star.png" className="rating-star" alt="rating"></img>
                            <img src="../img/star.png" className="rating-star" alt="rating"></img>
                        </div>
                    </div>
                    <div className="product-controls">
                        <div className="product-quantity">
                            <button className="product-quantity-field-button" onClick={(() => this.handleQuantityDecrease())}>-</button>
                            <input type="number" value={this.state.quantity} min="1" className="product-quantity-field" id="product-quantity-field"/>
                            <button className="product-quantity-field-button" onClick={(() => this.handleQuantityIncrease())}>+</button>
                        </div>
                        <div className="product-buy">
                            <Link to="/paypal" className="product-buy-button">BUY</Link>                                                                        
                        </div>
                        <div className="product-icons">
                            <img src="../img/shopping-cart.png" alt="cart"></img>
                            <img src="../img/favorite.png" alt="favourite"></img>
                        </div>
                    </div>
                </div>
            </div></>
        )
    }
}

export default withParams(Products);