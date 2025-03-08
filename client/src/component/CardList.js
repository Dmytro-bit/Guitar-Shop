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

    sortProducts = (products, sortOption) => {
        // Create a shallow copy of products to avoid mutating state
        const sortedProducts = [...products];

        switch (sortOption) {
            case "Price: Low to High":
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case "Price: High to Low":
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            case "Rating: Low to High":
                // Assuming your product object has a rating property
                sortedProducts.sort((a, b) => a.rating - b.rating);
                break;
            case "Rating: High to Low":
                sortedProducts.sort((a, b) => b.rating - a.rating);
                break;
            case "Alphabetically: A-Z":
                sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "Alphabetically: Z-A":
                sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                break;
        }
        return sortedProducts;
    };
    render() {
        const {search, sort} = this.props;
        const filteredData = this.state.data.filter(product => {
            return product.name.toLowerCase().includes(search.toLowerCase()) && product.brand.toLowerCase().includes(search.toLowerCase()) ;
        });

        const sortedData = this.sortProducts(filteredData, sort);
        return (
            <div id="cards-container">
                {sortedData.map((product, index) => (
                    <div className="card" key={index}><Card
                        _id={product._id}
                        images={product.images}
                        name={product.name}
                        brand={product.brand}
                        model={product.model}
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