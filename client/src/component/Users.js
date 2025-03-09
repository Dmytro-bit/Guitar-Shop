import React from "react";

import Nav from "./Nav";
import "../styles/users.scss"
import axios from "axios";
import {Link} from "react-router-dom";

class Users extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
        };
    }

    componentDidMount = async () => {
        try {
            const headers = {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            };
            const res = await axios.get("/user", {headers});
            this.setState({users: res.data.data});
            console.log("Users : ", this.state.users);
        } catch (error) {
            console.error("Users: ", error.message);
        }
    }

    handleDeleteUser = async (id) => {
        try {
            const headers = {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            };

            await axios.delete(`/user/${id}`, {headers});
            window.location.reload();
        } catch (e) {
            console.error(e);
        }
    }

    handleToUserOrders = (id) => {
        this.setState({toUserOrders: !this.state.toUserOrders, ID : id});
    }

    render() {
        console.log("Users : ", this.state.users);
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
                <div className="users-container">
                    {this.state.users.map((user, index) => (
                        <div className="user-container" key={index}>
                            <Link to={`/orders/${user._id}`} className="user-image-container">
                                <img
                                    style={{filter: user.profilePhotoUrl === "../icons/user.png" ? "invert(100%)" : "invert(0%)"}}
                                    src={user.profilePhotoUrl} className="user-image"/>
                            </Link>
                            <div className="user-main-container">
                                <Link to={`/orders/${user._id}`} className="user-description-container">
                                    <div className="user-name-container">
                                        <p className="user-name">{user.fname} {user.lname}</p>
                                    </div>
                                    <div className="user-email-container">
                                        <p className="user-email">{user.email}</p>
                                    </div>
                                    <div className="user-phone-container">
                                        <p className="user-phone">{user.phone}</p>
                                    </div>
                                </Link>
                                <div className="user-delete-button-category">
                                    <button className="user-delete-button"
                                            onClick={() => this.handleDeleteUser(user._id)}>DELETE
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        )
    }
}

export default Users;