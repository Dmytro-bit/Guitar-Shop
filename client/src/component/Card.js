import React from "react";

import "../styles/card.scss"
import {Link} from "react-router-dom";
import ProductModal from "./ProductModal";
import ApprovalModal from "./ApprovalModal";

class Card extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
                isAdmin : false,
                isEditModalOpen: false,
                isDeleteModalOpen: false
            }
    }

    componentDidMount = () => {
        this.setState({isAdmin: localStorage.getItem("accessLevel") === "2"});
    }

    handleEditModal = () => {
        this.setState({isEditModalOpen: !this.state.isEditModalOpen});
    }

    handleDeleteModal = () => {
        this.setState({isDeleteModalOpen: !this.state.isDeleteModalOpen});
    }

    render() {
        return (
            <>
                {this.state.isDeleteModalOpen && <ApprovalModal
                    text="Are you sure you want to delete this product?"
                    handleClick={this.handleDeleteModal}
                    handleClose={this.handleDeleteModal}
                    color="red"/>}
                {this.state.isEditModalOpen && <ProductModal
                    type="edit"
                    name={this.props.name}
                    brand={this.props.brand}
                    images={this.props.images}
                    price={this.props.price}
                    quantity={this.props.quantity}
                    parameters={this.props.parameters}
                    handleClose={this.handleEditModal}/>}
                <div className="card-container">
                <div className="card-content-container">
                    <div className="card-image-container">
                        <Link to={`/products/${this.props._id}`} className="card-image-link"><img
                            src={this.props.images[0]} className="card-image"/></Link>
                    </div>
                    <div className="card-main-container">
                        <div className="card-description">
                            <div className="card-name">
                                <Link to={`/products/${this.props._id}`}
                                      style={{color: "black", textDecoration: "none"}}>{this.props.name}
                                </Link>
                                {this.state.isAdmin ? (
                                    <div className="admin-controls-container">
                                        <img src="../icons/bin.png" className="heart-icon" onClick={this.handleDeleteModal}/>
                                        <img src="../icons/editing.png" className="heart-icon" onClick={this.handleEditModal}/>
                                    </div>
                                    ) : (<img src="../icons/heart.png" className="heart-icon"/>)}
                            </div>
                            <Link to={`/products/${this.props._id}`}
                                  className="card-characteristics"
                                  style={{color: "black", textDecoration: "none"}}>
                                <ul className="characteristics-list">
                                    {Object.entries(this.props.parameters)
                                        .slice(0, 5)
                                        .map(([key, value], index) => (
                                            <li key={index}><strong>{key}:</strong> {value}</li>
                                        ))
                                    }
                                </ul>
                            </Link>
                            <div className="card-price-container">
                                <div className="card-price">
                                    <p className="price">${this.props.price}</p>
                                    <p style={{color: this.props.quantity > 0 ? "green" : "red"}}
                                       className="inStock">{this.props.quantity > 0 ? "In Stock" : "Not In Stock"}</p>
                                </div>
                                <button className="card-buy-button">ADD TO CART</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default Card