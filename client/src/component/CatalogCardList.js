import React from 'react';
import CatalogCard from "./CatalogCard";

import "../styles/catalogCardlist.scss"
import CategoryModal from "./CategoryModal";
import axios from "axios";

class CatalogCardList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: [],
            isAddModalOpen: false,
        }
    }

    handleAddModal = async () => {
        await this.handleRefresh()
        this.setState({isAddModalOpen: !this.state.isAddModalOpen});
    }


    handleRefresh = async () => {
        try {
            const res = await axios.get("/categories")
            this.setState({cards: res.data.data});
            console.log("Response data:", this.state);
        } catch (e) {
            console.log(e.message);
        }
    }

    componentDidMount = async () => {
        await this.handleRefresh();
    }

    render() {
        return (
            <>
                {this.state.isAddModalOpen && <div className="modal-bg"></div>}
                <div className="catalog-cardlist-container">
                    {this.state.isAddModalOpen && <CategoryModal
                        type="add"
                        name=""
                        cover_image=""
                        background_image=""
                        category_id=""
                        handleClose={this.handleAddModal}/>}
                    {this.state.cards.map((card, index) => (
                        <CatalogCard key={index}
                                     name={card.name}
                                     cover_image={card.cover_image}
                                     background_image={card.background_image}
                                     isAdmin={this.props.isAdmin}
                                     category_id={card._id}
                                     handleRefresh={this.handleRefresh}
                        />
                    ))}
                    <div className="catalog-card-container new-catalog-card"
                         style={{display: this.props.isAdmin ? "flex" : "none"}}>
                        <div className="catalog-card-image-container new-catalog-card-image-container"
                             onClick={(e) => this.handleAddModal(e)}>
                            <img src="../icons/plus.png" alt="Add Category"
                                 className="catalog-card-image new-catalog-card-image"/>
                        </div>
                        <div className="new-catalog-card-name">Add Category</div>
                    </div>
                </div>
            </>
        )
    }
}

export default CatalogCardList;