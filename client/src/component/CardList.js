import React from "react";

import Card from "./Card"

import "../styles/cardlist.scss"
import axios from "axios";

class CardList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    async componentDidMount() {
        try {
            const res = await axios.get("/products");
            console.log(res.data.data)
            this.setState({data: res.data.data});

        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };


    render() {
        return (
            <div id="cards-container">
                {this.state.data.map((product, index) => (
                    <div className="card" key={index}><Card
                        _id={product._id}
                        images={product.images}
                        name={product.name}
                        price={product.price}
                        inStock={product.quantity > 0}
                        parameters={product.parameters}
                    /></div>
                ))}
            </div>
        );
    }
}

export default CardList