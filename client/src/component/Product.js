import React from "react";
import {Link, useParams} from "react-router-dom";

import Nav from "./Nav";
import "../styles/product.scss"
import axios from "axios";

function withParams(Component) {
    return (props) => <Component {...props} params={useParams()}/>;
}

class Products extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            product: {
                images: [],
                name: "",
                price: 0,
                rating: 0,
                quantity: 0,
                parameters: {}
            },
            currImage: 0,
            quantity: 1,

        }
    }

    scrollImageForward = () => {
        this.state.currImage >= this.state.product.images.length - 1 ? this.setState({currImage: 0}) : this.setState({currImage: this.state.currImage + 1});
        console.log(this.state.currImage);
    }

    scrollImageBackward = () => {
        this.state.currImage <= 0 ? this.setState({currImage: this.state.product.images.length - 1}) : this.setState({currImage: this.state.currImage - 1});
        console.log(this.state.currImage);
    }

    handleQuantityIncrease = () => {
        if (this.state.quantity < this.state.product.quantity)
            this.setState({quantity: this.state.quantity + 1});
    }

    handleQuantityDecrease = () => {
        if (this.state.quantity > 1)
            this.setState({quantity: this.state.quantity - 1});
    }

    async componentDidMount() {
        try {
            const {id} = this.props.params;
            console.log("componentDidMount is called");

            const res = await axios.get(`/products/${id}`);
            console.log("Response data:", res.data.data); // Log the API response

            // Update state with the product data
            this.setState({product: res.data.data});

        } catch (error) {
            console.error("Error fetching product:", error);
        }
    }

    addToCart = async () => {
        const token = localStorage.getItem("token");
        let data = JSON.parse(localStorage.getItem("shopping_cart"));

        if (data === null) {
            data = []
        }
        const {id} = this.props.params;

        const item =
            {
                "product": id,
                "quantity": this.state.quantity,
            }
        const index = data.findIndex(obj => obj.product === this.props.params);
        if (index !== -1) {
            data[index] = {
                ...data[index],
                quantity: this.state.quantity
            };
        } else {
            data.push(item)
        }
        localStorage.setItem("shopping_cart", JSON.stringify(data));
        if (token !== "null") {
            try {
                const res = await axios.patch("/shopping-cart", data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log("Response data:", res.data);
            } catch
                (error) {
                console.error("Error creating cart:", error);
            }
        }

    }

    render() {

        console.log(this.state.product);
        return (
            <><Nav/>
                <div className="product-container">
                    <div className="product-header">
                        <Link className="back-to-products-link" to="/products">← BACK</Link>
                    </div>
                    <div className="product-left">
                        <div className="product-name-mobile">{this.state.product.name}</div>
                        <div className="product-images-container">
                            <img
                                src={(this.state.product.images.filter((img, index) => index === this.state.currImage))}
                                alt="instrument"
                                className="product-image"></img>
                            <img src="../img/right-arrow.png" alt="arrow" className="product-image-arrow"
                                 id="product-image-arrow-left" onClick={this.scrollImageBackward}/>
                            <img src="../img/right-arrow.png" alt="arrow" className="product-image-arrow"
                                 id="product-image-arrow-right" onClick={this.scrollImageForward}/>
                        </div>
                        <div className="product-chars">
                            <p className="product-chars-title">Description</p>
                            <ul className="product-chars-list">
                                {Object.entries(this.state.product.parameters)
                                    .map(([key, value], index) => (
                                        <li className="product-chars-list-element" key={index}><p
                                            className="product-chars-list-element-key"><strong>{key}:</strong></p>
                                            <p
                                                className="product-chars-list-element-value">{value}</p></li>
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
                                style={{color: this.state.product.quantity > 0 ? "green" : "red"}}
                            >{this.state.product.quantity > 0 ? "In Stock" : "Not In Stock"}</p>
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
                                <button className="product-quantity-field-button"
                                        onClick={(() => this.handleQuantityDecrease())}>-
                                </button>
                                <input type="number" value={this.state.quantity} min="1"
                                       className="product-quantity-field" id="product-quantity-field"/>
                                <button className="product-quantity-field-button"
                                        onClick={(() => this.handleQuantityIncrease())}>+
                                </button>
                            </div>
                            <div className="product-buy">
                                <Link to="/cart" className="product-buy-button" onClick={this.addToCart}>ADD TO
                                    CART</Link>
                            </div>
                            <div className="product-icons">
                                <img src="../img/shopping-cart.png" alt="cart"></img>
                                <img src="../img/favorite.png" alt="favourite"></img>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default withParams(Products);