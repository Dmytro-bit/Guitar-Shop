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
            address: {
                fline: "",
                sline: "",
                city: "",
                county: "",
                eircode: "",
            },
            addressParse: {
                "fline": "First Line",
                "sline": "Second Line",
                "city": "City",
                "county": "County",
                "eircode": "Eircode"
            },
            isAddressEditable: false,
            isAddressSet: false,
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

        const savedAddress = localStorage.getItem("orderAddress");
        const isAddressSetStored = localStorage.getItem("isAddressSet") === "true";
        if (savedAddress && isAddressSetStored) {
            this.setState({
                address: JSON.parse(savedAddress),
                isAddressSet: true
            });
        }
        await this.getCart();
        await this.getDefaultAddress();


    };



    getCart = async () => {
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
    }

    getDefaultAddress = async () => {
        this.checkEmptyAddress()

        const token = localStorage.getItem("token");
        if (token) {
            // Only proceed if the order address has not been finalized
            if (!this.state.isAddressSet) {
                const email = localStorage.getItem("email");
                try {
                    const res = await axios.get("/user/getUserAddress", { params: { email } });
                    const fetchedAddress = res.data.address;  // User's current profile address
                    // Set the order address only once, then set the flag
                    this.setState({ address: fetchedAddress, isAddressSet: true }, () => {
                        localStorage.setItem("orderAddress", JSON.stringify(fetchedAddress));
                        localStorage.setItem("isAddressSet", "true");
                    });
                } catch (error) {
                    console.error("Error fetching default address:", error.message);
                }
            }
        }
    };




    checkEmptyAddress = () => {
        const noEmptyFields = Object.keys(this.state.address).map(key =>
            this.state.address[key].trim()).every(value => value !== "")

        console.log("Address Set: --" + noEmptyFields)
        if (noEmptyFields)
            this.setState({isAddressSet: true});
        return noEmptyFields
    }

    handleIsAddressEdittable = () => {
        this.setState({isAddressEditable: !this.state.isAddressEditable});
    }

    handleDeliveryAddressSave = () => {
        const newAddress = {
            fline: document.getElementById("cart-delivery-address-fline").value,
            sline: document.getElementById("cart-delivery-address-sline").value,
            city: document.getElementById("cart-delivery-address-city").value,
            county: document.getElementById("cart-delivery-address-county").value,
            eircode: document.getElementById("cart-delivery-address-eircode").value,
        }

        this.setState({address: newAddress}, ()=>(localStorage.setItem("orderAddress", JSON.stringify(newAddress))));
    }

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
                <p className="cart-delivery-address-section-title">Delivery Address</p>
                <div className="cart-delivery-address-section-container">
                    <div className="cart-delivery-address-container">
                        {Object.keys(this.state.address).map((line, index) => (
                            <div className="cart-delivery-address-field-container" key={index}>
                                <p className="cart-delivery-address-field-title">{this.state.addressParse[line]}</p>
                                <input type="text" value={this.state.address[line]} id={`cart-delivery-address-${line}`}
                                       className={`cart-delivery-address-field ${this.state.isAddressEditable ? "edit-address" : ""}`}
                                       disabled={this.state.isAddressEditable ? false : true}
                                       onChange={this.handleDeliveryAddressSave}/>
                            </div>
                        ))}
                        <button className="cart-delivery-address-edit-button"
                                onClick={this.handleIsAddressEdittable}>{this.state.isAddressEditable ? "SAVE" : "EDIT"}</button>
                    </div>
                    <div className="cart-delivery-address-image-container">
                        <img src="../img/truck.png" className="cart-delivery-address-image"/>
                    </div>
                </div>
            </>
        )
    }
}

export default Cart;
