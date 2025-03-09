import React from "react";

import "../styles/catalogCard.scss"
import CategoryModal from "./CategoryModal";
import ApprovalModal from "./ApprovalModal";
import axios from "axios";
import {Navigate} from "react-router-dom";

class CatalogCard extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isEditModalOpen: false,
            isDeleteModalOpen: false,
            toFilter: ""

        }
    }

    handleEditModal = () => {
        this.setState({isEditModalOpen: !this.state.isEditModalOpen});
    }

    handleDeleteModal = () => {
        this.setState({isDeleteModalOpen: !this.state.isDeleteModalOpen});
    }

    handleDeleteCategory = async () => {

        const headers = {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        };
        await axios.delete(`/categories/${this.props.category_id}`, {headers});

        this.handleDeleteModal();
        await this.props.handleRefresh()
    }

    sendToFilter = (e, category_name) => {
        e.preventDefault();
        this.setState({toFilter: category_name});
    };

    render() {
        if (this.state.toFilter) {
            return <Navigate to={`/products?category=${this.props.category_id}`}/>;
        }


        return (
            <>
                {this.state.isEditModalOpen && <CategoryModal
                    type="edit"
                    name={this.props.name}
                    cover_image={this.props.cover_image}
                    background_image={this.props.background_image}
                    handleClose={this.handleEditModal}
                    category_id={this.props.category_id}
                />}

                {this.state.isDeleteModalOpen && <ApprovalModal
                    text="Are you sure you want to delete category?"
                    color="red"
                    handleClick={this.handleDeleteCategory}
                    handleClose={this.handleDeleteModal}/>}
                {this.state.isEditModalOpen && <div className="modal-bg"></div>}
                <div className={`catalog-card-container ${this.props.isAdmin ? "no-hover" : ""}`}>
                    <div className="catalog-card-name">{this.props.name}</div>
                    <div className="catalog-card-image-container">
                        <img className="catalog-card-image"
                             src={this.props.cover_image}
                             alt="Category cover Image"/>
                    </div>

                    <img
                        src={this.props.background_image}
                        className="catalog-card-hover-bg"
                        alt="Category background Image"
                        onClick={(e) => this.sendToFilter(e, this.props.category_id)}
                    />

                    <div className="catalog-card-controls-container"
                         style={{display: this.props.isAdmin ? "flex" : "none"}}>
                        <button className="catalog-card-control-button" onClick={this.handleDeleteModal}>DELETE</button>
                        <button className="catalog-card-control-button" onClick={this.handleEditModal}>EDIT</button>
                    </div>
                </div>
            </>
        )
    }
}

export default CatalogCard;