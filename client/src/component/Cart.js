import React from "react"
import {Link} from "react-router-dom";

import Nav from "./Nav"

import "../styles/cart.scss"
import axios from "axios";

class Cart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cartProducts: [],
            total: 0,
        }
    }

    handleQuantityIncrease = (i) => {
        const updatedCartProducts = [...this.state.cartProducts];
        if (updatedCartProducts[i].quantity < updatedCartProducts[i].product.quantity) {
            updatedCartProducts[i].quantity += 1;
            this.setState({cartProducts: updatedCartProducts});
        }
    }

    handleQuantityDecrease = (i) => {
        const updatedCartProducts = [...this.state.cartProducts];
        if (updatedCartProducts[i].quantity > 1) {
            updatedCartProducts[i].quantity -= 1;
            this.setState({cartProducts: updatedCartProducts});
        }
    }

    async componentDidMount() {
        try {
            const res = await axios.get("/shopping-cart", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });
            console.log(res.data)
            const {shopping_cart, total} = res.data

            console.log("Shopping cart:", shopping_cart, "Total:", total)
            if (res.status === 200) {
                this.setState({cartProducts: shopping_cart, total: total});
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    render() {
        return (
            <><Nav></Nav>
                <div className="cart-container">
                    <div className="cart-content">
                        <Link to="/products" className="back">←BACK</Link>
                        <div className="cart-title-container">
                            <p className="cart-title">Shopping Cart</p>
                        </div>
                        <div className="cart-contents-container">
                            <div className="cart-products-container">
                                {this.state.cartProducts.map((cartProduct, index) => (
                                    <div className="cart-product-container" key={index}>
                                        <div className="cart-product-image-container">
                                            <img src={cartProduct.product.images[0]} className="cart-product-image"
                                                 alt="cart product image"/>

                                        </div>
                                        <div className="cart-product-details-container">
                                            <div className="top-row">
                                                <p className="cart-product-name">{cartProduct.product.name}</p>
                                                <img src="../icons/bin.png" className="cart-delete-product-icon"
                                                     alt="delete product"/>
                                            </div>
                                            <div className="middle-row">
                                                <p className="cart-product-delivery">Free Delivery</p>
                                                <p className="cart-product-stock"
                                                   style={{color: cartProduct.product.quantity > 0 ? "green" : "red"}}>
                                                    {cartProduct.product.quantity > 0 ? "In Stock" : "Not In Stock"}
                                                </p>
                                            </div>
                                            <div className="bottom-row">
                                                <div className="cart-product-price">{cartProduct.product.price}$</div>
                                                <div className="cart-product-quantity">
                                                    <button className="product-quantity-field-button"
                                                            onClick={(() => this.handleQuantityDecrease(index))}>-
                                                    </button>
                                                    <input type="number" value={cartProduct.quantity} min="1"
                                                           className="product-quantity-field"
                                                           id="product-quantity-field"/>
                                                    <button className="product-quantity-field-button"
                                                            onClick={(() => this.handleQuantityIncrease(index))}>+
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="cart-total-container">
                                <div className="cart-total-price-container">
                                    <p className="cart-total-title">Total: </p>
                                    <p className="cart-total-price">{this.state.total}$</p>
                                </div>
                                <div className="cart-total-additional-container">VAT included in the price</div>
                                <div className="cart-total-checkout-container">
                                    <button className="cart-total-checkout-button">CHECKOUT</button>
                                </div>
                            </div>
                            <div className="cart-total-container-alt">
                                <div className="cart-total-pricelist-container">
                                    {this.state.cartProducts.map((cartProduct, index) => (
                                        <div className="cart-total-pricelist-element" key={index}>
                                            <div className="cart-total-pricelist-element-name">
                                                {cartProduct.product.name}
                                            </div>
                                            <div className="cart-total-pricelist-element-price">
                                                {cartProduct.product.price}$
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="cart-total-price-container">
                                    <p className="cart-total-title">Total: </p>
                                    <p className="cart-total-price">{this.state.total}$</p>
                                </div>
                                <div className="cart-total-checkout-container">
                                    <button className="cart-total-checkout-button">CHECKOUT</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Cart;
