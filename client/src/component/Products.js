import React from "react";

import Nav from "./Nav"
import CardList from "./CardList"

import "../styles/products.scss"

import axios from "axios";

class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            sort: "Price: Low to High",
            data: {},
            parameters: {},
            brands : {},
            categories : {}
        }
    }

    componentDidMount = async () => {
        try {
            const res = await axios.get("/products/filter")
            this.setState({data: res.data.data, parameters : res.data.data.parameters, brands : res.data.data.brands, categories : res.data.data.categories});
            console.log("Response data:", this.state.parameters);
        } catch (e) {
            console.log(e.message);
        }
    }

    handleSortChange = (sortOption) => {
        this.setState({sort: sortOption});
    };


    handleInputChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        this.setState({[name]: value});
    }


    render() {

        return (
            <><Nav/>
                <div className="products-container">
                    <div className="products-controls-container">
                        <div className="products-controls">
                            <div className="product-search-container">
                                <img src="../icons/search-icon.png" alt="search-icon" className="product-search-icon"/>
                                <input name="search" type="text" onChange={this.handleInputChange}
                                       className="product-search" placeholder="Search..."/>
                            </div>
                            <div className="dropdowns">
                                <div className="filter-dropdown">
                                    <input type="checkbox" className="filter-dropdown-toggle"
                                           id="filter-dropdown-toggle"/>
                                    <label htmlFor="filter-dropdown-toggle"
                                           className="filter-dropdown-label">FILTER</label>
                                    <div className="filter-window">
                                        <label htmlFor="filter-dropdown-toggle" className="filter-dropdown-close"><img
                                            src="../icons/close.png"/></label>
                                    </div>
                                </div>
                                <div className="sort-dropdown">
                                    <input type="checkbox" className="sort-dropdown-toggle" id="sort-dropdown-toggle"/>
                                    <label htmlFor="sort-dropdown-toggle" className="sort-dropdown-label">SORT</label>

                                    <ul className="sort-dropdown-menu">
                                        <li className="sort-dropdown-item"
                                            onClick={() => this.handleSortChange("Price: Low to High")}>Price: Low to
                                            High
                                        </li>
                                        <li className="sort-dropdown-item"
                                            onClick={() => this.handleSortChange("Price: High to Low")}>Price: High to
                                            Low
                                        </li>
                                        <li className="sort-dropdown-item"
                                            onClick={() => this.handleSortChange("Rating: Low to High")}>Rating: Low to
                                            High
                                        </li>
                                        <li className="sort-dropdown-item"
                                            onClick={() => this.handleSortChange("Rating: High to Low")}>Rating: High to
                                            Low
                                        </li>
                                        <li className="sort-dropdown-item "
                                            onClick={() => this.handleSortChange("Alphabetically: A-Z")}>Alphabetically:
                                            A-Z
                                        </li>
                                        <li className="sort-dropdown-item"
                                            onClick={() => this.handleSortChange("Alphabetically: Z-A")}>Alphabetically:
                                            Z-A
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="products-filter-container">
                        <div className="products-filter">
                            <div className="products-filter-brands-container">
                                <input className="products-filter-input" type="checkbox" id="filter-brands-toggle"/>
                                <label className="products-filters-title" htmlFor={"filter-brands-toggle"}>BRANDS</label>
                                <div className="filter-dropdown-container">
                                    {Object.keys(this.state.brands).map((brand, index) => (
                                        <div className="filter-brand-dropdown-option" key={index}>
                                            <input type="checkbox" id={`filter-brand-${brand}`} className="filter-brand-checkbox"/>
                                            <label className={`filter-brand-label`}>{this.state.brands[brand]}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="products-filter-categories-container">
                                <input className="products-filter-input" type="checkbox" id="filter-categories-toggle"/>
                                <label className="products-filter-title" htmlFor={"filter-categories-toggle"}>CATEGORIES</label>
                                <div className="filter-dropdown-container">
                                    {Object.keys(this.state.categories).map((category, index) => (
                                        <div className="filter-categories-dropdown-option" key={index}>
                                            <input type="checkbox" id={`filter-category-${category}`}
                                                   className="filter-category-checkbox"/>
                                            <label
                                                className={`filter-category-label`}>{this.state.categories[category]}</label>
                                        </div>
                                    ))}
                                </div>
                                </div>
                            <div className="products-filter-parameters-container">
                                <input className="products-filter-input" type="checkbox" id="filter-parameters-toggle"/>
                                <label className="products-filter-title" htmlFor={"filter-parameters-toggle"}>PARAMETERS</label>
                                <div className="filter-dropdown-container">
                                    {Object.keys(this.state.parameters).map((parameter, index) => (
                                        <div className="filter-parameter-container" key={index}>
                                            <input type="checkbox" className="products-filter-input"
                                                   id={`filter-parameter-${parameter}`} key={index}/>
                                            <label htmlFor={`filter-parameter-${parameter}`}
                                                   className="filter-parameter-title"><b>{parameter}</b></label>
                                            <div className="filter-dropdown-container">
                                                {this.state.parameters[parameter].map((option, index) => (
                                                    <div className="filter-parameter-dropdown-option" key={index}>
                                                        <input type="checkbox" id={`filter-parameter-${option}`}
                                                               className="filter-parameter-checkbox"/>
                                                        <label
                                                            htmlFor={`filter-parameter-${option}`}>{option}</label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="products-category-name">All Products</div>
                    {/*TODO Make it display currently viewed category*/}
                    <div className="cardlist-container"><CardList sort={this.state.sort} search={this.state.search}/>
                    </div>
                </div>
            </>
        )
    }


}

export default Products