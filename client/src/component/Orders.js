import React, { Component } from "react";

import Order from "./Order";
import Nav from "./Nav";

import "../styles/orders.scss"
import axios from "axios";

class Orders extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            orders: [],
            id : ""
        }
    }

    componentDidMount = async () => {
        try {
            const headers = {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            };
            const res = await axios.get("/order", {headers});

            this.setState({orders: res.data.data});
        } catch (e) {
            console.log(e.message);
        }
        this.setState({isAdmin: localStorage.getItem("accessLevel") === "2"});
    }

    render() {
        return (
            <>
                <Nav/>
                <div className="controls-container">
                    <div className="search-container">
                        <img src="../icons/search-icon.png" alt="search-icon" className="product-search-icon"/>
                        <input type="text" className="search" placeholder="Seacrch.."/>
                    </div>
                    <div className="sort-dropdown-container">
                        <input type="checkbox" className="sort-dropdown-toggle" id="sort-dropdown-toggle"/>
                        <label htmlFor="sort-dropdown-toggle" className="sort-dropdown-label">SORT</label>

                        <ul className="sort-dropdown-menu">
                            <li className="sort-dropdown-item">Price: Low to
                                High
                            </li>
                            <li className="sort-dropdown-item">Price: High to
                                Low
                            </li>
                            <li className="sort-dropdown-item">Rating: Low to
                                High
                            </li>
                            <li className="sort-dropdown-item">Rating: High to
                                Low
                            </li>
                            <li className="sort-dropdown-item ">Alphabetically:
                                A-Z
                            </li>
                            <li className="sort-dropdown-item">Alphabetically:
                                Z-A
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="orders-container">
                    {this.state.orders.map((order, index) => (
                        <Order
                            key={index}
                            created_at={order["created_at"]}
                            paid={order.paid}
                            items={order["items"]}
                            total={order.total_price}/>
                    ))}
                </div>
            </>
        )
    }
}

export default Orders;