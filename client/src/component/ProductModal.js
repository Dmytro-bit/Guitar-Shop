import React from "react"

import "../styles/productModal.scss"
import axios from "axios";

class ProductModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            images: [],
            parameters : {},
            categories : {}
        }
    }

    componentDidMount = async()=>{
        try {
            const res = await axios.get("/categories");
            console.log("Categories: ", res.data.data);
            Object.keys(res.data.data).map(key => {console.log(res.data.data[key].name)});
            this.setState({categories: res.data.data});
        } catch (e) {
            console.error(e.message);
        }
        this.setState({images: this.props.images, parameters: this.props.parameters});
    }

    handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            const newImages = [...this.state.images];
            newImages.push(imageUrl);
            this.setState({ images: newImages });
        }
    };

    handleDeleteImage = (index) => {
        const newImages = [...this.state.images];
        newImages.splice(index, 1);
        this.setState({ images: newImages });
    }

    handleAddProperty = () => {
        const newParameters = {...this.state.parameters};
        newParameters[""] = ""
        this.setState({ parameters: newParameters });
    }

    handleDeleteProperty = (key) => {
        const newParameters = {...this.state.parameters};
        delete newParameters[key];
        this.setState({ parameters: newParameters });
        console.log(key);
    }

    handlePropertyKeyChange = (e, oldKey) => {
        const newKey = e.target.value;
        const { parameters } = this.state;

        // Skip if key is empty or already exists
        if (!newKey || newKey === oldKey || parameters.hasOwnProperty(newKey)) {
            return;
        }

        const newParameters = { ...parameters };
        newParameters[newKey] = newParameters[oldKey];
        delete newParameters[oldKey];

        this.setState({ parameters: newParameters });
    }

    handlePropertyValueChange = (e, key) => {
        const newParameters = {...this.state.parameters};
        newParameters[key] = e.target.value;
        this.setState({ parameters: newParameters });
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
                            <input type="text" className="product-modal-name-input" defaultValue={this.props.name}/>
                        </div>
                        <div className="product-modal-name-container">
                            <p className="product-modal-name-title"><b>Product Brand:</b></p>
                            <input type="text" className="product-modal-name-input" defaultValue={this.props.brand}/>
                        </div>
                        <div className="product-modal-category-container">
                            <p className="product-modal-name-title"><b>Product Brand:</b></p>
                            {/*<input type="text" className="product-modal-name-input" defaultValue={this.props.brand}/>*/}
                            <select className="product-modal-select-category-container">
                                {Object.keys(this.state.categories).map(key => (
                                    <option key={this.state.categories[key]._id} selected={this.state.categories[key].name === this.props.category}>{this.state.categories[key].name}</option>
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
                            <input type="text" className="product-modal-price-input" defaultValue={this.props.price}/>
                        </div>
                        <div className="product-modal-stock-container">
                            <p className="product-modal-stock-title"><b>Product Quantity:</b></p>
                            <input type="text" className="product-modal-stock-input"
                                   defaultValue={this.props.quantity}/>
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
                                    onClick={() => this.props.handleClose()}>SAVE
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default ProductModal;
