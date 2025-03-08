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
            brands : {},
            categories : {},
            minPrice : 0,
            maxPrice : 100,
        }
    }

    componentDidMount = async () =>
    {
        try {
            const res = await axios.get("/products/filter")
            this.setState({data: res.data.data, parameters : res.data.data.parameters, brands : res.data.data.brands, categories : res.data.data.categories});
            console.log("Response data:", this.state.parameters);
        }catch(e){
            console.log(e.message);
        }
    }

    handlePriceChange = (key, value) => {
        this.setState({[key] : value});
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
                                        <div className="products-filter">
                                            <div className="products-filter-pricerange-container">
                                                <p className="products-filter-pricerange-title">PRICE RANGE</p>
                                                <div className="pricerange-container">
                                                    <input type="number" className="pricerange-box" id="pricerange-min"
                                                           min="0" placeholder="MIN"
                                                           onChange={(e) => this.handlePriceChange('minPrice', e.target.value)}></input>
                                                    <div className="pricerange-devider"></div>
                                                    <input type="number" className="pricerange-box" id="pricerange-max"
                                                           min="0" placeholder="MAX"
                                                           onChange={(e) => this.handlePriceChange('maxPrice', e.target.value)}></input>
                                                </div>
                                            </div>
                                            <div className="products-filter-brands-container">
                                                <input className="products-filter-input" type="checkbox"
                                                       id="filter-brands-toggle-mobile"/>
                                                <label className="products-filter-title"
                                                       htmlFor={"filter-brands-toggle-mobile"}>BRANDS
                                                    <img src="../img/right-arrow.png" className="filter-arrow"/></label>
                                                <div className="filter-dropdown-container">
                                                    {Object.keys(this.state.brands).map((brand, index) => (
                                                        <div className="filter-dropdown-option" key={index}>
                                                            <input type="checkbox" id={`filter-brand-${brand}-mobile`}
                                                                   className="filter-option-checkbox"/>
                                                            <label className={`filter-brand-label`}
                                                                   htmlFor={`filter-brand-${brand}-mobile`}>{this.state.brands[brand]}</label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="products-filter-categories-container">
                                                <input className="products-filter-input" type="checkbox"
                                                       id="filter-categories-toggle-mobile"/>
                                                <label className="products-filter-title"
                                                       htmlFor={"filter-categories-toggle-mobile"}>CATEGORIES <img
                                                    src="../img/right-arrow.png" className="filter-arrow"/></label>
                                                <div className="filter-dropdown-container">
                                                    {Object.keys(this.state.categories).map((category, index) => (
                                                        <div className="filter-dropdown-option" key={index}>
                                                            <input type="checkbox" id={`filter-category-${category}-mobile`}
                                                                   className="filter-option-checkbox"/>
                                                            <label
                                                                className={`filter-category-label`}
                                                                htmlFor={`filter-category-${category}-mobile`}>{this.state.categories[category]}</label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="products-filter-parameters-container">
                                                <input className="products-filter-input" type="checkbox"
                                                       id="filter-parameters-toggle-mobile"/>
                                                <label className="products-filter-title"
                                                       htmlFor={"filter-parameters-toggle-mobile"}>PARAMETERS <img
                                                    src="../img/right-arrow.png" className="filter-arrow"/></label>
                                                <div className="filter-dropdown-container">
                                                    {Object.keys(this.state.parameters).map((parameter, index) => (
                                                        <div className="filter-parameter-container" key={index}>
                                                            <input type="checkbox" className="products-filter-input"
                                                                   id={`filter-parameter-${parameter}-mobile`} key={index}/>
                                                            <label htmlFor={`filter-parameter-${parameter}-mobile`}
                                                                   className="filter-parameter-title">{parameter}<img
                                                                src="../img/right-arrow.png" className="filter-arrow"/></label>
                                                            <div className="filter-dropdown-container">
                                                                {this.state.parameters[parameter].map((option, index) => (
                                                                    <div className="filter-dropdown-option" key={index}>
                                                                        <input type="checkbox"
                                                                               id={`filter-parameter-${option}-mobile`}
                                                                               className="filter-parameter-checkbox"/>
                                                                        <label
                                                                            htmlFor={`filter-parameter-${option}-mobile`}>{option}</label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <label htmlFor="filter-dropdown-toggle" className="filter-dropdown-close"><img
                                            src="../icons/close.png"/></label>
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
                            <div className="products-filter-pricerange-container">
                                <p className="products-filter-pricerange-title">PRICE RANGE</p>
                                <div className="pricerange-container">
                                    <input type="number" className="pricerange-box" id="pricerange-min" min="0"
                                           placeholder="MIN"
                                           onChange={(e) => this.handlePriceChange('minPrice', e.target.value)}></input>
                                    <div className="pricerange-devider"></div>
                                    <input type="number" className="pricerange-box" id="pricerange-max" min="0"
                                           placeholder="MAX"
                                           onChange={(e) => this.handlePriceChange('maxPrice', e.target.value)}></input>
                                </div>
                            </div>
                            <div className="products-filter-brands-container">
                                <input className="products-filter-input" type="checkbox" id="filter-brands-toggle"/>
                                <label className="products-filter-title" htmlFor={"filter-brands-toggle"}>BRANDS
                                    <img src="../img/right-arrow.png" className="filter-arrow"/></label>
                                <div className="filter-dropdown-container">
                                    {Object.keys(this.state.brands).map((brand, index) => (
                                        <div className="filter-dropdown-option" key={index}>
                                            <input type="checkbox" id={`filter-brand-${brand}`}
                                                   className="filter-option-checkbox"/>
                                            <label className={`filter-brand-label`}
                                                   htmlFor={`filter-brand-${brand}`}>{this.state.brands[brand]}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="products-filter-categories-container">
                                <input className="products-filter-input" type="checkbox" id="filter-categories-toggle"/>
                                <label className="products-filter-title"
                                       htmlFor={"filter-categories-toggle"}>CATEGORIES <img
                                    src="../img/right-arrow.png" className="filter-arrow"/></label>
                                <div className="filter-dropdown-container">
                                    {Object.keys(this.state.categories).map((category, index) => (
                                        <div className="filter-dropdown-option" key={index}>
                                            <input type="checkbox" id={`filter-category-${category}`}
                                                   className="filter-option-checkbox"/>
                                            <label
                                                className={`filter-category-label`}
                                                htmlFor={`filter-category-${category}`}>{this.state.categories[category]}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="products-filter-parameters-container">
                                <input className="products-filter-input" type="checkbox" id="filter-parameters-toggle"/>
                                <label className="products-filter-title"
                                       htmlFor={"filter-parameters-toggle"}>PARAMETERS <img
                                    src="../img/right-arrow.png" className="filter-arrow"/></label>
                                <div className="filter-dropdown-container">
                                    {Object.keys(this.state.parameters).map((parameter, index) => (
                                        <div className="filter-parameter-container" key={index}>
                                            <input type="checkbox" className="products-filter-input"
                                                   id={`filter-parameter-${parameter}`} key={index}/>
                                            <label htmlFor={`filter-parameter-${parameter}`}
                                                   className="filter-parameter-title">{parameter}<img
                                                src="../img/right-arrow.png" className="filter-arrow"/></label>
                                            <div className="filter-dropdown-container">
                                            {this.state.parameters[parameter].map((option, index) => (
                                                    <div className="filter-dropdown-option" key={index}>
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
                    {/*Make it display currently viewed category*/}
                    <div className="cardlist-container"><CardList /></div>
                </div>
            </>
        )
    }


}

export default Products