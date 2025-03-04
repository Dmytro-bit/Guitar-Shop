import React from "react"

import Nav from "./Nav"

import "../styles/cart.scss"

class Cart extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            cartProducts : [
                {
                    product : {
                        images: ["../img/fenderTest.jpeg", ""],
                        name: "Fender 70th Anniversary Stratocaster",
                        price: 599.99,
                        stock : 100,
                        chars: {
                            Shape: "Stratocaster",
                            Strings: "6",
                            Frets: "22",
                            Body: "Mahogany",
                            Pickups: "Single"
                        }
                    },
                    quantity : 1,
                },
                {
                    product : {
                        images: ["../img/guitar-test.png", ""],
                        name: "Gibson Les Paul Standard 50s HCS",
                        price: 2500.00,
                        stock : 100,
                        chars: {
                            Shape: "Les Paul",
                            Strings: "6",
                            Frets: "22",
                            Body: "Mahogany",
                            Pickups: "Humbuckers"
                        }
                    },
                    quantity : 2,
                },
            ],
            total : 3099.99,
        }
    }

    handleQuantityIncrease = (i) => {
        const updatedCartProducts = [...this.state.cartProducts];
        if (updatedCartProducts[i].quantity < updatedCartProducts[i].product.stock) {
            updatedCartProducts[i].quantity += 1;
            this.setState({ cartProducts: updatedCartProducts });
        }
    }

    handleQuantityDecrease = (i) => {
        const updatedCartProducts = [...this.state.cartProducts];
        if (updatedCartProducts[i].quantity > 1) {
            updatedCartProducts[i].quantity -= 1;
            this.setState({ cartProducts: updatedCartProducts });
        }
    }

    render() {
        return (
            <><Nav></Nav>
            <div className="cart-container">
                <div className="cart-content">
                    <div className="back">←BACK</div>
                    <div className="cart-title-container">
                        <p className="cart-title">Shopping Cart</p>
                    </div>
                    <div className="cart-contents-container">
                        <div className="cart-products-container">
                            {this.state.cartProducts.map((cartProduct, index) => (
                                <div className="cart-product-container" key={index}>
                                    <div className="cart-product-image-container">
                                        <img src={cartProduct.product.images[0]} className="cart-product-image" alt="cart product image" />

                                    </div>
                                    <div className="cart-product-details-container">
                                        <div className="top-row">
                                            <p className="cart-product-name">{cartProduct.product.name}</p>
                                            <img src="../icons/bin.png" className="cart-delete-product-icon" alt="delete product" />
                                        </div>
                                        <div className="middle-row">
                                            <p className="cart-product-delivery">Free Delivery</p>
                                            <p className="cart-product-stock"
                                                style={{color : cartProduct.product.stock > 0 ? "green" : "red"}}>
                                                {cartProduct.product.stock > 0 ? "In Stock" : "Not In Stock"}
                                            </p>
                                        </div>
                                        <div className="bottom-row">
                                            <div className="cart-product-price">{cartProduct.product.price}$</div>
                                            <div className="cart-product-quantity">
                                                <button className="product-quantity-field-button"
                                                        onClick={(() => this.handleQuantityDecrease(index))}>-
                                                </button>
                                                <input type="number" value={cartProduct.quantity} min="1"
                                                       className="product-quantity-field" id="product-quantity-field"/>
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
