import React from "react";

import Order from "./Order";
import Nav from "./Nav";

import "../styles/orders.scss"

class Orders extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            orders: [
                {
                    customer_info: {
                        address: {
                            fline: "jfjnsadjfsaf",
                            sline: "fdafdsfsda",
                            city: "fdsfadsfsd",
                            county: "dsfdsafsd",
                            eircode: "dsafdasddsa"
                        },
                        name: "John Doe",
                        phone: "+3821893221",
                        email: "test@test.com"
                    },
                    _id: "67cdbae36150cb8dccbee60e",
                    user_id: null,
                    items: [
                        {
                            product: {
                                model: "Model",
                                _id: "67cc45a08f193d39dbe23f16",
                                name: "Thomann C-402 NT Set",
                                brand: "Thomann",
                                price: 89,
                                quantity: 21,
                                rating: 4.2,
                                images: [
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_45/451510/13946216_800.jpg",
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_45/451510/14017272_800.jpg",
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_45/451510/14017267_800.jpg",
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_45/451510/14017317_800.jpg",
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_45/451510/14017327_800.jpg",
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_45/451510/14017312_800.jpg",
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_45/451510/14017332_800.jpg",
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_45/451510/14017282_800.jpg",
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_45/451510/14017307_800.jpg",
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_45/451510/14017287_800.jpg",
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_45/451510/14017292_800.jpg",
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_45/451510/14017297_800.jpg",
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_45/451510/14017302_800.jpg",
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_45/451510/13946196_800.jpg",
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_45/451510/13946201_800.jpg",
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_45/451510/13946206_800.jpg",
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_45/451510/13946211_800.jpg"
                                ],
                                category: "67cc4007df0119994e677d2f"
                            },
                            quantity: 2,
                            _id: "67cdbae36150cb8dccbee60f"
                        }
                    ],
                    total_price: 43124,
                    paid: true,
                    payment_id: "huy vam a ne dengi",
                    created_at: "2025-03-09T15:59:31.534Z",
                    updated_at: "2025-03-09T15:59:31.535Z",
                    __v: 0
                },
                {
                    customer_info: {
                        address: {
                            fline: "jfjnsadjfsaf",
                            sline: "fdafdsfsda",
                            city: "fdsfadsfsd",
                            county: "dsfdsafsd",
                            eircode: "dsafdasddsa"
                        },
                        name: "John Doe",
                        phone: "+3821893221",
                        email: "test@test.com"
                    },
                    _id: "67cdbae96150cb8dccbee611",
                    user_id: null,
                    items: [
                        {

                            product: {
                                model: "Model",
                                _id: "67cc45a08f193d39dbe23f16",
                                name: "Thomann C-402 NT Set",
                                brand: "Thomann",
                                price: 89,
                                quantity: 21,
                                rating: 4.2,
                                images: [
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_45/451510/13946216_800.jpg",
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_45/451510/14017272_800.jpg",
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_45/451510/14017267_800.jpg",
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_45/451510/14017317_800.jpg",
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_45/451510/14017327_800.jpg",
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_45/451510/14017312_800.jpg",
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_45/451510/14017332_800.jpg",
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_45/451510/14017282_800.jpg",
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_45/451510/14017307_800.jpg",
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_45/451510/14017287_800.jpg",
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_45/451510/14017292_800.jpg",
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_45/451510/14017297_800.jpg",
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_45/451510/14017302_800.jpg",
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_45/451510/13946196_800.jpg",
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_45/451510/13946201_800.jpg",
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_45/451510/13946206_800.jpg",
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_45/451510/13946211_800.jpg"
                                ],
                                category: "67cc4007df0119994e677d2f"
                            },
                            quantity: 2,
                            _id: "67cdbae96150cb8dccbee612"
                        },
                        {
                            product: {
                                model: "Model",
                                _id: "67cc45a08f193d39dbe23f1d",
                                name: "La Mancha Romero Granito 32-1/2 N",
                                brand: "La Mancha",
                                price: 139,
                                quantity: 19,
                                rating: 4.7,
                                images: [
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_44/449776/18899846_800.jpg",
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_44/449776/18899841_800.jpg",
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_44/449776/18899876_800.jpg",
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_44/449776/18899816_800.jpg",
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_44/449776/18899821_800.jpg",
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_44/449776/18899811_800.jpg",
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_44/449776/18899806_800.jpg",

                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_44/449776/18899861_800.jpg",
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_44/449776/18899851_800.jpg",
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_44/449776/18899856_800.jpg",
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_44/449776/18899866_800.jpg",
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_44/449776/18899836_800.jpg",
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_44/449776/18899826_800.jpg",
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_44/449776/18899831_800.jpg",
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_44/449776/18899871_800.jpg"
                                ],
                                category: "67cc4007df0119994e677d2f"
                            },
                            quantity: 7,
                            _id: "67cdbae96150cb8dccbee613"
                        }
                    ],
                    total_price: 43124,
                    paid: true,
                    payment_id: "huy vam a ne dengi",
                    created_at: "2025-03-09T15:59:37.323Z",
                    updated_at: "2025-03-09T15:59:37.323Z",
                    __v: 0
                }
            ]
        }
    }
    render() {
        return (
            <>
            <Nav/>
                <div className="orders-controls-container">
                    <div className="orders-search-container">
                        <img src="../icons/search-icon.png" alt="search-icon" className="product-search-icon"/>
                        <input type="text" className="orders-search" placeholder="Seacrch.."/>
                    </div>
                    <div className="orders-sort-dropdown-container">
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