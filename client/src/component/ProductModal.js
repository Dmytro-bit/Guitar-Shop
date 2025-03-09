import React from "react"

import "../styles/productModal.scss"
import axios from "axios";

class ProductModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            images: [],
            parameters: {},
            categories: {},
            name: "",
            brand: "",
            price: 0,
            quantity: 0,
            images_files: [],
        }
    }

    componentDidMount = async () => {
        try {
            const res = await axios.get("/categories");
            this.setState({categories: res.data.data});
        } catch (e) {
            console.error(e.message);
        }

        this.setState(
            {
                images: this.props.images,
                parameters: this.props.parameters,
                name: this.props.name,
                brand: this.props.brand,
                price: this.props.price,
                quantity: this.props.quantity,
                selectedCategory: this.props.category,
            });
    }

    handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            const newImages = [...this.state.images];
            newImages.push(imageUrl);

            const newImages_files = [...this.state.images_files];
            newImages_files.push(file);
            this.setState({images: newImages, images_files: newImages_files});
        }
    };

    handleDeleteImage = (index) => {
        const newImages = [...this.state.images];
        const newImages_files = [...this.state.images_files];

        newImages.splice(index, 1);
        newImages_files.splice(index, 1);
        this.setState({images: newImages, images_files: newImages_files});
    }

    handleAddProperty = () => {
        const newParameters = {...this.state.parameters};
        newParameters[""] = ""
        this.setState({parameters: newParameters});
    }

    handleDeleteProperty = (key) => {
        const newParameters = {...this.state.parameters};
        delete newParameters[key];
        this.setState({parameters: newParameters});
        console.log(key);
    }

    handlePropertyKeyChange = (e, oldKey) => {
        const newKey = e.target.value;
        const {parameters} = this.state;

        // Skip if key is empty or already exists
        if (!newKey || newKey === oldKey || parameters.hasOwnProperty(newKey)) {
            return;
        }

        const newParameters = {...parameters};
        newParameters[newKey] = newParameters[oldKey];
        delete newParameters[oldKey];

        this.setState({parameters: newParameters});
    }

    handlePropertyValueChange = (e, key) => {
        const newParameters = {...this.state.parameters};
        newParameters[key] = e.target.value;
        this.setState({parameters: newParameters});
    }

    handleChange = (key) => (e) => {
        this.setState({[key]: e.target.value}, () => {
            console.log("Updated State:", this.state);
        });
    };

    handleCategoryChange = (event) => {
        this.setState({selectedCategory: event.target.value});
        console.log("Category:", this.state);
    };

    handleSave = async () => {
        const {
            images_files,
            parameters,
            name,
            brand,
            price,
            quantity,
            images,
            selectedCategory,
            categories
        } = this.state;
        const formData = new FormData();

        const headers = {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data"
        };

        formData.append("name", name);
        formData.append("brand", brand);
        formData.append("price", price);
        formData.append("quantity", quantity);
        formData.append("parameters", JSON.stringify(parameters));
        images_files.forEach((image, index) => {
            formData.append(`images_files`, image);
        })
        const selectedCategoryObj = categories.find(cat => cat.name === selectedCategory);
        const selectedCategoryID = selectedCategoryObj ? selectedCategoryObj._id : null;


        formData.append("category", selectedCategoryID);
        formData.append("images", JSON.stringify(images));

        if (this.props.type === "add") {
            await axios.post("/products", formData, {headers})
        } else if (this.props.type === "edit") {
            await axios.patch(`/products/${this.props.product_id}`, formData, {headers})

        }
        this.props.handleClose()
        window.location.reload()
    }

    render() {
        return (
            <>
                <div className="modal-bg"></div>
                <div className="product-modal-container">
                    <div className="product-modal-header-container">
                        <div className="product-modal-close-container" onClick={this.props.handleClose}>
                            <img src="../icons/close.png" alt="close" className="product-modal-close"/>
                        </div>
                        <p className="product-modal-title">{this.props.type === "add" ? "Add Product" : "Edit Product"}</p>
                    </div>
                    <div className="product-modal-content">
                        <div className="product-modal-name-container">
                            <p className="product-modal-name-title"><b>Product Name:</b></p>
                            <input type="text" className="product-modal-name-input" value={this.state.name}
                                   onChange={this.handleChange("name")}/>
                        </div>
                        <div className="product-modal-name-container">
                            <p className="product-modal-name-title"><b>Product Brand:</b></p>
                            <input type="text" className="product-modal-name-input" value={this.state.brand}
                                   onChange={this.handleChange("brand")}/>
                        </div>
                        <div className="product-modal-category-container">
                            <p className="product-modal-name-title"><b>Product Category:</b></p>
                            <select
                                className="product-modal-select-category-container"
                                value={this.state.selectedCategory}
                                onChange={this.handleCategoryChange}
                            >
                                {Object.keys(this.state.categories).map(key => (
                                    <option key={this.state.categories[key]._id}
                                            selected={this.state.categories[key].name === this.props.category}
                                            className="product-modal-select-category-option">
                                        {this.state.categories[key].name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="product-modal-images-container">
                            {this.state.images.length > 0 && this.state.images.map((image, index) => (
                                <div className="product-modal-image-container" key={index}>
                                    <img src={image} alt={`image ${index}`} className="product-modal-image"></img>
                                    <div className="product-modal-delete-image-container">
                                        <img src="../icons/bin.png" className="product-modal-delete-image"
                                             onClick={() => this.handleDeleteImage(index)}></img>
                                    </div>
                                </div>
                            ))}
                            <input type="file" className="product-modal-add-image-input"
                                   id="product-modal-add-image-input"
                                   onChange={(e) => this.handleImageUpload(e)}></input>
                            <label htmlFor="product-modal-add-image-input"
                                   className="product-modal-image-container label">ADD</label>
                        </div>
                        <div className="product-modal-price-container">
                            <p className="product-modal-price-title"><b>Product Price:</b></p>
                            <input type="text" className="product-modal-price-input" value={this.state.price}
                                   onChange={this.handleChange("price")}/>
                        </div>
                        <div className="product-modal-stock-container">
                            <p className="product-modal-stock-title"><b>Product Quantity:</b></p>
                            <input type="number" className="product-modal-stock-input"
                                   value={this.state.quantity} onChange={this.handleChange("quantity")}/>
                        </div>
                        <div className="product-modal-properties-container">
                            <p className="product-modal-properties-title"><b>Product Properties:</b></p>
                            {Object.keys(this.state.parameters).length > 0 && Object.keys(this.state.parameters).map((key, index) => (
                                <div className="product-modal-property-container" key={key}>
                                    <input type="text" className="product-property-input" defaultValue={key}
                                           onBlur={(e) => this.handlePropertyKeyChange(e, key)}/>
                                    <input type="text" className="product-property-input"
                                           onBlur={(e) => this.handlePropertyValueChange(e, key)}
                                           defaultValue={this.state.parameters[key]}/>
                                    <div className="product-modal-delete-property-container">
                                        <img src="../icons/bin.png" className="product-modal-delete-property"
                                             onClick={() => this.handleDeleteProperty(key)}/>
                                    </div>
                                </div>
                            ))}
                            <div className="product-modal-add-property-button-container">
                                <button className="product-modal-add-property-button"
                                        onClick={() => this.handleAddProperty()}>ADD PROPERTY
                                </button>
                            </div>
                        </div>
                        <div className="product-modal-save-button-container">
                            <button className="product-modal-save-button"
                                    onClick={this.handleSave}>SAVE
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default ProductModal;
