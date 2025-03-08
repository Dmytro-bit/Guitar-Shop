import React from 'react';
import "../styles/categoryModal.scss";

class CategoryModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageURL: "",
            hoverImageURL: "",
        };
    }

    handleImageUpload = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            this.setState({ [type]: imageUrl });
            console.log(`${type} uploaded:`, file);
        }
    };

    renderImageSection = (label, id, imageURL, defaultImageURL) => (
        <div className="category-modal-image-container">
            <p className="category-modal-image-title"><b>{label}</b></p>
            <label htmlFor={id} className="category-modal-add-image">
                {imageURL || defaultImageURL ? (
                    <img src={imageURL || defaultImageURL} alt={label} className="category-modal-image-preview" />
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
                style={{ display: "none" }}
            />
        </div>
    );

    render() {
        const { type, name, imageURL, hoverImageURL, handleClose } = this.props;
        const { imageURL: uploadedImageURL, hoverImageURL: uploadedHoverImageURL } = this.state;

        return (
            <div className="category-modal-container">
                <div className="category-modal-header-container">
                    <div className="category-modal-close-container" onClick={handleClose}>
                        <img src="../icons/close.png" alt="close" className="category-modal-close" />
                    </div>
                    <p className="category-modal-title">{type === "add" ? "Add Category" : "Edit Category"}</p>
                </div>
                <div className="category-modal-content">
                    <div className="category-modal-name-container">
                        <p className="category-modal-name-title"><b>Category Name:</b></p>
                        <input type="text" className="category-modal-name-input" defaultValue={name} />
                    </div>
                    {this.renderImageSection("Current Image:", "imageURL", uploadedImageURL, imageURL)}
                    {this.renderImageSection("Current Hover Image:", "hoverImageURL", uploadedHoverImageURL, hoverImageURL)}
                </div>
                <div className="category-modal-buttons-container">
                    <button className="category-modal-button">SAVE</button>
                </div>
            </div>
        );
    }
}

export default CategoryModal;
