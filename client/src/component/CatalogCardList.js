import React from 'react';
import CatalogCard from "./CatalogCard";

import "../styles/catalogCardlist.scss"
import CategoryModal from "./CategoryModal";

class CatalogCardList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cards : [
                {
                    name : "Electric Guitars",
                    imageURL : "../img/guitar-test.png",
                    hoverImageURL : "../img/davemustaine.jpg",
                },
                {
                    name : "Acoustic Guitars",
                    imageURL : "../img/acousticGuitar.jpg",
                    hoverImageURL : "../img/tommyemmanuel.jpg",
                },
                {
                    name : "Bass Guitars",
                    imageURL : "../img/bassGuitar.jpg",
                    hoverImageURL : "../img/sting.jpg",
                },
                {
                    name : "Drums",
                    imageURL : "../img/drums.jpg",
                    hoverImageURL : "../img/stewartcopeland.jpg",
                },
                {
                    name : "Microphones",
                    imageURL : "../img/micro.jpg",
                    hoverImageURL : "../img/olegvinnik.png",
                }
            ],
            isAddModalOpen: false,
        }
    }

    handleAddModal = (e) => {
        this.setState({isAddModalOpen: !this.state.isAddModalOpen});
    }

    render() {
        return (

            <>
                {this.state.isAddModalOpen && <div className="modal-bg"></div>}
                <div className="catalog-cardlist-container">
                    {this.state.isAddModalOpen && <CategoryModal
                        type="add"
                        name=""
                        imageURL=""
                        hoverImageURL=""
                        handleClose={this.handleAddModal}/>}
                    {this.state.cards.map((card, index) => (
                        <CatalogCard key={index} name={card.name} imageURL={card.imageURL} hoverImageURL={card.hoverImageURL} isAdmin={this.props.isAdmin}/>
                    ))}
                    <div className="catalog-card-container new-catalog-card" style={{display : this.props.isAdmin ? "flex" : "none"}}>
                        <div className="catalog-card-image-container new-catalog-card-image-container" onClick={(e) => this.handleAddModal(e)}>
                            <img src="../icons/plus.png" alt="Add Category" className="catalog-card-image new-catalog-card-image"/>
                        </div>
                        <div className="new-catalog-card-name">Add Category</div>
                    </div>
                </div>
            </>
        )
    }
}

export default CatalogCardList;