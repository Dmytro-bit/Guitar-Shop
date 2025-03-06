import React from "react";

import "../styles/catalogCard.scss"

class CatalogCard extends React.Component {
    constructor (props) {
        super(props)
    }

    render () {
        return(
            <div className="catalog-card-container">
                <div className="catalog-card-name">{this.props.name}</div>
                <div className="catalog-card-image-container"><img className="catalog-card-image" src={this.props.imageURL}/></div>
                <img src={this.props.hoverImageURL} className="catalog-card-hover-bg"/>
            </div>
        )
    }
}

export default CatalogCard;