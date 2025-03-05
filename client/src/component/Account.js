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
                    fline: "",
                    sline: "",
                    city: "",
                    county: "",
                    eircode: "",
                },
                profilePhotoUrl: "../icons/user.png",
            },
            selectedFile: null,
            isEditable: false,
            isAddressSet : false,
            isSettingAddressEnabled : false,
            addressWasSubmittedOnce : false,
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
        const email = localStorage.getItem("email");
        if (!email || email === "null" || email === "undefined") {
            console.log("No valid email found; user is not logged in.");
            return;
        }
        try {

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
            console.log(this.state.user.address.fline);
            this.checkEmptyAddress()

        } catch (err) {
            console.log(err)
        }
    }

    checkEmptyAddress = () => {
        const noEmptyFields = Object.keys(this.state.user.address).map(key =>
            this.state.user.address[key].trim()).every(value => value !== "")

        console.log("Address Set: "+noEmptyFields)
        if (noEmptyFields)
            this.setState({ isAddressSet: true });
        return noEmptyFields
    }
    closeAccount = () => {
        this.setState({isEditable: false})
    }

    handleEditMode = () => {
        this.setState({isEditable: !this.state.isEditable})
        this.setState({isSettingAddressEnabled : false })


        //Write a put request ro update the data
    }
    clickOnPlaceholder = () => {
        if (this.imageHandlerRef.current) {
            this.imageHandlerRef.current.click()
        }

    }

    handleEnablingSettingAddress = () => {
        this.setState({isSettingAddressEnabled : true })
    }

    handleAddressChange = (e) => {
        e.preventDefault();
        const { user } = this.state;
        const { name, value } = e.target;
        this.setState({
            user: {
                ...user,
                address: {
                    ...user.address,
                    [name]: value
                }
            }
        })
    }

    handleAddressSave = async () => {
        const noEmptyFields = this.checkEmptyAddress()
        if (noEmptyFields){
            this.setState({isSettingAddressEnabled : false })

            try {
                const {fline, sline, city, county, eircode} = this.state.user.address;
                const email = this.state.user.email;
                console.log("email sent to patch", email);
                const sentData = {email: email, fline: fline, sline: sline, city: city, county: county, eircode: eircode};
                console.log("sentData", sentData);
                const res = await axios.patch(`/user/editAddress`, sentData)
                const address = res.data.user.address;
                console.log("address is ", address)
            } catch (e){
                console.log(e)
            }

            this.setState({addressWasSubmittedOnce : true})
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
                    <div className="user-account-cred-container" style={{display : this.state.isAddressSet ? "flex" : "none"}}>
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
                    <div className="set-address-container" style={{display : this.state.isAddressSet ? "none" : "flex"}}>
                        {!this.state.isSettingAddressEnabled ?
                            (
                                <>
                                    <div className="set-address-text-container">
                                        <p className="set-address-text">It looks like you haven't set your delivery address yet. Let's fix it straight away!</p>
                                    </div>
                                    <button className="set-address-button" onClick={this.handleEnablingSettingAddress}>SET ADDRESS</button>
                                </>
                            ) : (
                                <>
                                    <p className={`user-account-cred-title`}>
                                        <u>First Address Line :</u></p>
                                    <input type="text" name="fline"
                                           className={`user-account-cred`} onChange={(e) => this.handleAddressChange(e)}/>
                                    <p className={`user-account-cred-title`}>
                                        <u>Second Address Line :</u></p>
                                    <input type="text" name="sline"
                                           className={`user-account-cred`} onChange={(e) => this.handleAddressChange(e)}/>
                                    <p className={`user-account-cred-title`}>
                                        <u>City/Town :</u></p>
                                    <input type="text" name="city"
                                           className={`user-account-cred`} onChange={(e) => this.handleAddressChange(e)}/>
                                    <p className={`user-account-cred-title`}>
                                        <u>County :</u></p>
                                    <input type="text" name="county"
                                           className={`user-account-cred`} onChange={(e) => this.handleAddressChange(e)}/>
                                    <p className={`user-account-cred-title`}>
                                        <u>Eircode</u></p>
                                    <input type="text" name="eircode" onChange={(e) => this.handleAddressChange(e)}
                                           className={`user-account-cred`}/>

                                    <button className="set-address-button" onClick={this.handleAddressSave}>SET ADDRESS</button>

                                    <p className="address-error" style={{display : this.state.addressWasSubmittedOnce ? "flex" : "none"}}>All Fields Should Be Filled</p>
                                </>
                            )}
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