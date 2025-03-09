import React from "react";

import Nav from "./Nav"
import ProductModal from "./ProductModal";
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
            brands: [],
            categories: [],
            minPrice: 0,
            maxPrice: 100,
            isAdmin: false,
            isAddModalOpen: false,
            checked: {
                brands: {},
                categories: {},
                parameters: {}
            },

        }
    }

    componentDidMount = async () => {
        try {
            const res = await axios.get("/products/filter")
            this.setState({
                data: res.data.data,
                parameters: res.data.data.parameters,
                brands: res.data.data.brands,
                categories: res.data.data.categories
            });
            console.log("Response data:", this.state.parameters);
        } catch (e) {
            console.log(e.message);
        }
        this.setState({isAdmin: localStorage.getItem("accessLevel") === "2"});
    }

    handleSortChange = (sortOption) => {
        this.setState({sort: sortOption});
    };

    // https://www.geeksforgeeks.org/what-is-currying-function-in-javascript/
    handleCheckBoxChange = (object, key) => (event) => {

        console.log("key",key, "group", object);
        const isChecked = event.target.checked;

        this.setState((prevState) => ({
            checked: {
                ...prevState.checked,
                [object]: {...prevState.checked[object], [key]: isChecked}
            }
        }),()=>{console.log("-------------",object,key,isChecked,this.state.checked)});
    }

    handleParameterChange = (parameter, option) => (event) => {
        const isChecked = event.target.checked;

        this.setState((prevState) => ({
            checked: {
                ...prevState.checked,
                parameters: {
                    ...prevState.checked.parameters,
                    [parameter]: {
                        ...((prevState.checked.parameters && prevState.checked.parameters[parameter]) || {}),
                        [option]: isChecked
                    }
                }
            }
        }) );
    };


    handleInputChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        this.setState({[name]: value});
    }

    handlePriceChange = (key, value) => {
        this.setState({[key]: value});
    }

    handleAddModal = () => {
        this.setState({isAddModalOpen: !this.state.isAddModalOpen});
    }


    render() {
        console.log(" Products state ", this.state);
        return (
            <><Nav/>
                {this.state.isAddModalOpen && <ProductModal
                    type="add"
                    name=""
                    images=""
                    price=""
                    quantity=""
                    parameters=""
                    handleClose={this.handleAddModal}/>}
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
                                                                   checked={this.state.checked.brands[brand] || false}

                                                                   onChange={this.handleCheckBoxChange("brands", this.state.brands[brand])}
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
                                                    {Object.keys(this.state.categories).map((key, index) => {
                                                        const categoryName = this.state.categories[key]; // extract the actual category name
                                                        return (
                                                            <div className="filter-dropdown-option" key={index}>
                                                                <input
                                                                    type="checkbox"
                                                                    id={`filter-category-${key}-mobile`}
                                                                    checked={this.state.checked.categories[categoryName] || false}
                                                                    onChange={this.handleCheckBoxChange("categories", categoryName)}
                                                                    className="filter-option-checkbox"
                                                                />
                                                                <label
                                                                    className="filter-category-label"
                                                                    htmlFor={`filter-category-${key}-mobile`}>
                                                                    {categoryName}
                                                                </label>
                                                            </div>
                                                        );
                                                    })}
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
                                                                   id={`filter-parameter-${parameter}-mobile`}
                                                                   key={index}/>
                                                            <label htmlFor={`filter-parameter-${parameter}-mobile`}
                                                                   className="filter-parameter-title">{parameter}<img
                                                                src="../img/right-arrow.png" className="filter-arrow"/></label>
                                                            <div className="filter-dropdown-container">
                                                                {this.state.parameters[parameter].map((option, index) => (
                                                                    <div className="filter-dropdown-option" key={index}>
                                                                        <input type="checkbox"
                                                                               checked={
                                                                                   (this.state.checked.parameters[parameter] &&
                                                                                       this.state.checked.parameters[parameter][option]) || false
                                                                               }
                                                                               onChange={this.handleParameterChange(parameter, option)}
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
                            {this.state.isAdmin && <div className="add-product-button-container">
                                <button className="add-product-button" onClick={this.handleAddModal}>+</button>
                            </div>}
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
                                    {this.state.brands.map((brand, index) => (
                                        <div className="filter-dropdown-option" key={index}>
                                            <input
                                                type="checkbox"
                                                id={`filter-brand-${brand}`}
                                                checked={this.state.checked.brands[brand] || false}
                                                onChange={this.handleCheckBoxChange("brands", brand)}
                                                className="filter-option-checkbox"
                                            />
                                            <label className="filter-brand-label" htmlFor={`filter-brand-${brand}`}>
                                                {brand}
                                            </label>
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
                                    {Object.keys(this.state.categories).map((key, index) => {
                                        const categoryName = this.state.categories[key];
                                        return (
                                            <div className="filter-dropdown-option" key={index}>
                                                <input
                                                    type="checkbox"
                                                    id={`filter-category-${key}`}
                                                    checked={this.state.checked.categories[categoryName] || false}
                                                    onChange={this.handleCheckBoxChange("categories", categoryName)}
                                                    className="filter-option-checkbox"
                                                />
                                                <label
                                                    className="filter-category-label"
                                                    htmlFor={`filter-category-${key}`}>
                                                    {categoryName}
                                                </label>
                                            </div>
                                        );
                                    })}
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
                                                               checked={
                                                                   (this.state.checked.parameters[parameter] &&
                                                                       this.state.checked.parameters[parameter][option]) || false
                                                               }
                                                               onChange={this.handleParameterChange(parameter, option)}
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
                    <div className="cardlist-container"><CardList maxPrice={this.state.maxPrice} minPrice={this.state.minPrice} sort={this.state.sort} search={this.state.search} checked={this.state.checked}/>
                    </div>
                </div>
            </>
        )
    }


}

export default Products