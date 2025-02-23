import React from "react";

import Nav from "./Nav"
import CardList from "./CardList"

import "../styles/products.scss"

class Products extends React.Component
{
    constructor(props)
    {
        super(props);
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
                                        <li className="sort-dropdown-item">Alphabeticaly: A-Z</li>
                                        <li className="sort-dropdown-item">Alphabeticaly: Z-A</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="products-filter-container">
                        <div className="products-filter"></div>
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