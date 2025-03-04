import React from "react"
import axios from "axios";

import "../styles/account.scss"

import SERVER_HOST from "../config/global_constants"

class Account extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {
                fname: "Test",
                lname: "User",
                email: "test@test.com",
                phone: "+353851234567",
                address: {
                    fline: "Test Address",
                    sline: "Test Street",
                    city: "Test City",
                    county: "Test County",
                    eircode: "Test Code",
                },
                profilePhotoUrl: "../icons/user.png",
            },
            selectedFile: null,
            isEditable: false,
        }
        this.imageHandlerRef = React.createRef();
    }

    componentDidMount = async () => {
        try {
            await this.loadUserData()
        } catch (err) {
            console.log(err);
        }
    }
    loadUserData = async () => {
        try {
            const email = localStorage.getItem("email");
            console.log(email)
            const res = await axios.get(`user/getProfile`, {params: {email}})
            console.log(res.data.user)
            const userData = res.data.user; // use the nested user object
            this.setState({
                user: {
                    fname: userData.fname,
                    lname: userData.lname,
                    email: userData.email,
                    phone: userData.phone,
                    address: {
                        fline: userData.address.fline,
                        sline: userData.address.sline, // corrected sline mapping
                        city: userData.address.city,
                        county: userData.address.county,
                        eircode: userData.address.eircode,
                    },
                    profilePhotoUrl: userData.profilePhotoUrl ? userData.profilePhotoUrl : "../icons/user.png"
                }
            });
        } catch (err) {
            console.log(err)
        }
    }
    closeAccount = () => {
        this.setState({isEditable: false})
    }

    handleEditMode = () => {
        this.setState({isEditable: !this.state.isEditable})

        //Write a put request ro update the data
    }
    clickOnPlaceholder = () => {
        if (this.imageHandlerRef.current) {
            this.imageHandlerRef.current.click()
        }

    }
    handleFileChange = async (e) => {
        const file = e.target.files[0]
        this.setState({selectedFile: file})
        if (file) {
            try {
                const formData = new FormData();
                const email = localStorage.getItem("email");

                formData.append('file', file)
                formData.append('email', email)
                const res = await axios.patch('user/upload', formData, {headers: {"Content-Type": "multipart/form-data"}})
                const url = res.data.userPhoto;
                this.setState(prevState => ({
                    user: {
                        ...prevState.user,
                        profilePhotoUrl: url
                    }
                }));
            } catch (err) {
                console.log(err)
            }
        }
    }

    render() {
        return (
            <div className={`user-account-container ${this.props.isActive ? "active" : "inactive"}`}>
                <img src="../icons/close.png" onClick={() => {
                    this.props.handleClose();
                    this.closeAccount(this.clickOnPlaceholder)
                }} className="user-account-close"/>
                <div className="user-account-header">
                    <div className="user-account-photo">
                        <input id="imageHandler" className={"hidden-input"} ref={this.imageHandlerRef}
                               onChange={this.handleFileChange} type={"file"}/> <img
                        src={this.state.user.profilePhotoUrl} onClick={this.clickOnPlaceholder}
                        className="user-account-photo"/>
                    </div>
                    <div className="user-account-name" style={{display: this.state.isEditable ? "none" : "flex"}}>
                        {this.state.user.fname} {this.state.user.lname}
                    </div>
                </div>
                {/* <hr /> */}
                <div className="user-account-data">
                    {this.state.isEditable ? (
                        <div>
                            <div className="user-account-cred-container">
                                <p className="user-account-cred-title"><u>First Name :</u></p>
                                <input type="text" value={this.state.user.fname} disabled={!this.state.isEditable}
                                       className="user-account-cred"></input>
                            </div>
                            <div className="user-account-cred-container">
                                <p className="user-account-cred-title"><u>Last Name :</u></p>
                                <input type="text" value={this.state.user.lname} disabled={!this.state.isEditable}
                                       className="user-account-cred"></input>
                            </div>
                        </div>
                    ) : (
                        <>
                        </>
                    )}
                    <div className="user-account-cred-container">
                        <p className="user-account-cred-title"><u>Email :</u></p>
                        <input type="text" value={this.state.user.email} disabled={!this.state.isEditable}
                               className="user-account-cred"></input>
                    </div>
                    <div className="user-account-cred-container">
                        <p className="user-account-cred-title"><u>Phone :</u></p>
                        <input type="text" value={this.state.user.phone} disabled={!this.state.isEditable}
                               className="user-account-cred"></input>
                    </div>
                    <div className="user-account-cred-container">
                        {!this.state.isEditable ? (
                            <div>
                                <p className="user-account-cred-title"><u>Address :</u></p>
                                <p className="user-account-cred">
                                    {this.state.user.address.fline},<br/>
                                    {this.state.user.address.city},<br/>
                                    {this.state.user.address.county},<br/>
                                    {this.state.user.address.eircode}
                                </p>
                            </div>
                        ) : (
                            <div>
                                <p className={`user-account-cred-title ${this.state.isEditable ? "editable" : ""}`}><u>First
                                    Address Line :</u></p>
                                <input type="text" defaultValue={this.state.user.address.fline}
                                       className={`user-account-cred ${this.state.isEditable ? "editable" : ""}`}/>
                                <p className={`user-account-cred-title ${this.state.isEditable ? "editable" : ""}`}><u>Second
                                    Address Line :</u></p>
                                <input type="text" defaultValue={this.state.user.address.sline}
                                       className={`user-account-cred ${this.state.isEditable ? "editable" : ""}`}/>
                                <p className={`user-account-cred-title ${this.state.isEditable ? "editable" : ""}`}><u>City/Town
                                    :</u></p>
                                <input type="text" defaultValue={this.state.user.address.city}
                                       className={`user-account-cred ${this.state.isEditable ? "editable" : ""}`}/>
                                <p className={`user-account-cred-title ${this.state.isEditable ? "editable" : ""}`}><u>County
                                    :</u></p>
                                <input type="text" defaultValue={this.state.user.address.county}
                                       className={`user-account-cred ${this.state.isEditable ? "editable" : ""}`}/>
                                <p className={`user-account-cred-title ${this.state.isEditable ? "editable" : ""}`}>
                                    <u>Eircode</u></p>
                                <input type="text" defaultValue={this.state.user.address.eircode}
                                       className={`user-account-cred ${this.state.isEditable ? "editable" : ""}`}/>
                            </div>
                        )
                        }
                    </div>
                </div>
                <div className="user-account-edit-button">
                    <button className="user-account-edit-save"
                            onClick={this.handleEditMode}>{this.state.isEditable ? "SAVE" : "EDIT"}</button>
                    <button className="user-account-edit-save" onClick={this.handleEditMode}
                            style={{display: this.state.isEditable ? "block" : "none"}}>CANCEL
                    </button>
                </div>
            </div>
        )
    }

}

export default Account