import React from "react";

import "../styles/catalogCard.scss"
import CategoryModal from "./CategoryModal";
import ApprovalModal from "./ApprovalModal";

class CatalogCard extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            isEditModalOpen: false,
            isDeleteModalOpen: false
        }
    }

    handleEditModal = () => {
        this.setState({isEditModalOpen: !this.state.isEditModalOpen});
    }

    handleDeleteModal = () => {
        this.setState({isDeleteModalOpen: !this.state.isDeleteModalOpen});
    }

    render () {
        return(
            <>
                {this.state.isEditModalOpen && <CategoryModal
                                                type="edit"
                                                name={this.props.name}
                                                imageURL={this.props.imageURL}
                                                hoverImageURL={this.props.hoverImageURL}
                                                handleClose={this.handleEditModal}/>}

                {this.state.isDeleteModalOpen && <ApprovalModal
                    text="Are you sure you want to delete category?"
                    color="red"
                    handleClick={this.handleDeleteModal}
                    handleClose={this.handleDeleteModal}/>}
                {this.state.isEditModalOpen && <div className="modal-bg"></div>}
                <div className={`catalog-card-container ${this.props.isAdmin ? "no-hover" : ""}`}>
                    <div className="catalog-card-name">{this.props.name}</div>
                    <div className="catalog-card-image-container"><img className="catalog-card-image" src={this.props.imageURL}/></div>
                    <img src={this.props.hoverImageURL} className="catalog-card-hover-bg"/>
                    <div className="catalog-card-controls-container" style={{display : this.props.isAdmin ? "flex" : "none"}}>
                        <button className="catalog-card-control-button" onClick={this.handleDeleteModal}>DELETE</button>
                        <button className="catalog-card-control-button" onClick={this.handleEditModal}>EDIT</button>
                    </div>
                </div>
            </>
        )
    }
}

export default CatalogCard;