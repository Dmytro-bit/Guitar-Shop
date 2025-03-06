import React from 'react';
import CatalogCard from "./CatalogCard";

import "../styles/catalogCardlist.scss"

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
            ]
        }
    }

    render() {
        return (
            <div className="catalog-cardlist-container">
                {this.state.cards.map((card, index) => (
                    <CatalogCard key={index} name={card.name} imageURL={card.imageURL} hoverImageURL={card.hoverImageURL}/>
                ))}
            </div>
        )
    }
}

export default CatalogCardList;