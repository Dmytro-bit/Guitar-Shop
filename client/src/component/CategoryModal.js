import React from 'react';
import "../styles/categoryModal.scss";
import axios from "axios";

class CategoryModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name || "",
            cover_image: "",
            background_image: "",
            cover_image_file: null,
            background_image_file: null,
        };
    }

    handleImageUpload = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            this.setState({[type]: imageUrl, [type + "_file"]: file});
            console.log(`${type} uploaded:`, file);
        }
    };

    handleSave = (id) => async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();

            formData.append("name", this.state.name);
            if (this.state.cover_image_file) formData.append("cover_image", this.state.cover_image_file);
            if (this.state.background_image_file) formData.append("background_image", this.state.background_image_file);

            const headers = {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "multipart/form-data"
            };

            let res;
            if (id) {
                res = await axios.patch(`/categories/${id}`, formData, {headers});
            } else {
                res = await axios.post(`/categories`, formData, {headers});
            }

            console.log("Response:", res.data);
            this.props.handleClose();
        } catch (error) {
            console.error("Error saving category:", error.response ? error.response.data : error.message);
        }
    };

    handleChange = (e) => {
        this.setState({name: e.target.value})
    }


    renderImageSection = (label, id, cover_image, defaultImageURL) => (
        <div className="category-modal-image-container">
            <p className="category-modal-image-title"><b>{label}</b></p>
            <label htmlFor={id} className="category-modal-add-image">
                {cover_image || defaultImageURL ? (
                    <img src={cover_image || defaultImageURL} alt={label} className="category-modal-image-preview"/>
                ) : (
                    "Add Image"
                )}
            </label>
            <input
                type="file"
                id={id}
                className="category-modal-image-input"
                accept="image/*"
                onChange={(e) => this.handleImageUpload(e, id)}
                style={{display: "none"}}
            />
        </div>
    );

    render() {
        const {type, name, cover_image, category_id, background_image, handleClose} = this.props;
        const {cover_image: uploadedImageURL, background_image: uploadedHoverImageURL} = this.state;

        return (
            <div className="category-modal-container">
                <div className="category-modal-header-container">
                    <div className="category-modal-close-container" onClick={handleClose}>
                        <img src="../icons/close.png" alt="close" className="category-modal-close"/>
                    </div>
                    <p className="category-modal-title">{type === "add" ? "Add Category" : "Edit Category"}</p>
                </div>
                <div className="category-modal-content">
                    <div className="category-modal-name-container">
                        <p className="category-modal-name-title"><b>Category Name:</b></p>
                        <input
                            type="text"
                            className="category-modal-name-input"
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                    </div>
                    {this.renderImageSection("Current Image:", "cover_image", uploadedImageURL, cover_image)}
                    {this.renderImageSection("Current Hover Image:", "background_image", uploadedHoverImageURL, background_image)}
                </div>
                <div className="category-modal-buttons-container">
                    <button className="category-modal-button" onClick={this.handleSave(category_id)}>SAVE
                    </button>
                </div>
            </div>
        );
    }
}

export default CategoryModal;
