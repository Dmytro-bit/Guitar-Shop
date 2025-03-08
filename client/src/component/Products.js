import React from "react";

import Nav from "./Nav"
import CardList from "./CardList"

import "../styles/products.scss"

import axios from "axios";

class Products extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            data : {},
            parameters : {},
        }
    }

    componentDidMount = async () =>
    {
        try {
            const res = await axios.get("/products/filter")
            this.setState({data: res.data.data, parameters : res.data.data.parameters});
            console.log("Response data:", this.state.parameters);
        }catch(e){
            console.log(e.message);
        }
    }

    render()
    {
        return(
            <><Nav />
                <div className="products-container">
                    <div className="products-controls-container">
                        <div className="products-controls">
                            <div className="product-search-container">
                                <img src="../icons/search-icon.png" alt="search-icon" className="product-search-icon"/>
                                <input type="text" className="product-search" placeholder="Search..."/>
                            </div>
                            <div className="dropdowns">
                                <div className="filter-dropdown">
                                    <input type="checkbox" className="filter-dropdown-toggle"
                                           id="filter-dropdown-toggle"/>
                                    <label htmlFor="filter-dropdown-toggle"
                                           className="filter-dropdown-label">FILTER</label>
                                    <div className="filter-window">
                                        <label htmlFor="filter-dropdown-toggle" className="filter-dropdown-close"><img src="../icons/close.png"/></label>
                                    </div>
                                </div>
                                <div className="sort-dropdown">
                                    <input type="checkbox" className="sort-dropdown-toggle" id="sort-dropdown-toggle"/>
                                    <label htmlFor="sort-dropdown-toggle" className="sort-dropdown-label">SORT</label>

                                    <ul className="sort-dropdown-menu">
                                        <li className="sort-dropdown-item">Price: Low to High</li>
                                        <li className="sort-dropdown-item">Price: High to Low</li>
                                        <li className="sort-dropdown-item">Rating: Low to High</li>
                                        <li className="sort-dropdown-item">Rating: High to Low</li>
                                        <li className="sort-dropdown-item">Alphabetically: A-Z</li>
                                        <li className="sort-dropdown-item">Alphabetically: Z-A</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="products-filter-container">
                        <div className="products-filter">
                            <div className="products-filter-brands-container">BRANDS</div>
                            <div className="products-filter-categories-container">CATEGORIES</div>
                            <div className="products-filter-parameters-container">
                                <p className="products-filter-parameters-title">PARAMETERS</p>
                                <div className="filter-parameters-container">
                                    {Object.keys(this.state.parameters).map((parameter, index) => (
                                        <div className="filter-parameter-container" key={index}>
                                            <input type="checkbox" className="filter-parameter-input" id={`filter-parameter-${parameter}`} key={index}/>
                                            <label htmlFor={`filter-parameter-${parameter}`} className="filter-parameter-title"><b>{parameter}</b></label>
                                            <div className="filter-parameter-dropdown">
                                                {this.state.parameters[parameter].map((option, index) => (
                                                    <div className="filter-parameter-dropdown-option" key={index}>
                                                        <input type="checkbox" id={`filter-parameter-${option}`} className="filter-parameter-checkbox"/>
                                                        <label htmlFor={`filter-parameter-${option}`}>{option}</label>
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
                    {/*Make it display currently viewed category*/}
                    <div className="cardlist-container"><CardList /></div>
                </div>
            </>
        )
    }


}

export default Products