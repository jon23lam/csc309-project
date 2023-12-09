import "../../signup/Signup.scss"
import "../../../BaseStyles.scss"
import "./AccountUpdate.scss"
import "../../petseeker/Search/SearchPage.scss"
import React, {useEffect, useState} from "react";
import { deleteAccount, shelterUpdateAccount } from "../../../requests/accountUpdate";
import { getMe } from "../../../requests/authentication";
import { Link } from "react-router-dom";

export function ShelterAccountUpdate () {

    const [formData, setFormData] = useState({
        shelter_name: "",
        street_address: "",
        city: "",
        province: "",
        postal_code: "",
        open_time: "",
        close_time: "",
        password: "",
        password_confirm: "",
        animals_offered: "",
        description: "",
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            getMe().then((response) => {
                setFormData(response.data)
            }).finally(() => {
                setLoading(false);
            })

        }
        
        fetchUserData();
    }, []);

    const [image, setImage] = useState({});

    const PROVINCE_OPTIONS = [
        { value: "", label: "Select" },
        { value: "ontario", label: "Ontario" },
        { value: "british-columbia", label: "British Columbia" },
        { value: "alberta", label: "Alberta" },
        { value: "saskatchewan", label: "Saskatchewan" },
        { value: "manitoba", label: "Manitoba" },
        { value: "quebec", label: "Quebec" },
        { value: "new-brunswick", label: "New Brunswick" },
        { value: "nova-scotia", label: "Nova Scotia" },
        { value: "newfoundland-labrador", label: "Newfoundland and Labrador" },
        { value: "pei", label: "Prince Edward Island" },
        { value: "yukon", label: "Yukon" },
        { value: "nwt", label: "Northwest Territories" },
        { value: "nunavut", label: "Nunavut" },
    ];

    const handleChange = (event) => {
        const {id, value} = event.target;
        setFormData({...formData, [id]: value});
    }

    const handleImage = (event) => {
        setImage(event.target.files[0]);
    }

    const handleDelete = async () => {
        try {
            const response = await deleteAccount(formData.id);
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = async () => {
        try {
            let submitData = new FormData();
            for (const entry in formData) {
                submitData.append(entry, formData[entry])
            }
            submitData.append("image", image);
            const response = await shelterUpdateAccount(formData.id, submitData);
        } catch (err) {
            console.log(err);
        }
    }

    return (
            <body>
            <div className="PageContainer">
                <div className="Main">
                    <h1>Edit Account Details</h1>
                    {!loading ? (
                    <div className="Signup__fields">
                        <div className="Filters__form">
                            <div className="Filters__filterItem">
                                <label htmlFor="shelter_name" className="signup-labels">Shelter Name:</label>
                                <input type="text" id="shelter_name" name="shelter_name"
                                       className="TextField__PurpleOutline signup-fields" placeholder="Shelter Name"
                                       value={formData.shelter_name} onChange={handleChange} required />
                            </div>
                            <div className="Filters__filterItem">
                                <label htmlFor="street_address" className="signup-labels">Street Address:</label>
                                <input type="text" id="street_address" name="street_address"
                                       className="TextField__PurpleOutline signup-fields" placeholder="Street Address"
                                       value={formData.street_address} onChange={handleChange} required />
                            </div>
                            <div className="Filters__filterItem">
                                <label htmlFor="city" className="signup-labels">City:</label>
                                <input type="text" id="city" name="city" className="TextField__PurpleOutline signup-fields"
                                       placeholder="City" value={formData.city} onChange={handleChange} required />
                            </div>
                            <div className="Filters__filterItem">
                                <label htmlFor="province" className="signup-labels">Province:</label>
                                <select
                                    name="province"
                                    id="province"
                                    className="Dropdown__PurpleOutline signup-fields"
                                    onChange={handleChange}
                                >
                                    {PROVINCE_OPTIONS.map((option) => (
                                        option.value === formData.province ?
                                        <option key={option.value} value={option.value} selected>
                                            {option.label}
                                        </option> : 
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="Filters__filterItem">
                                <label htmlFor="postal_code" className="signup-labels">Postal Code:</label>
                                <input type="text" id="postal_code" name="postal_code"
                                       className="TextField__PurpleOutline signup-fields" placeholder="Postal Code"
                                       value={formData.postal_code} onChange={handleChange} required />
                            </div>
                            <div className="Filters__filterItem">
                                <label htmlFor="open_time" className="signup-labels">Open Time:</label>
                                <input type="time" id="open_time" name="open_time"
                                       className="TextField__PurpleOutline hour-fields" value={formData.open_time} onChange={handleChange} />
                            </div>
                            <div className="Filters__filterItem">
                                <label htmlFor="close_time" className="signup-labels">Close Time:</label>
                                <input type="time" id="close_time" name="close_time"
                                       className="TextField__PurpleOutline hour-fields" value={formData.close_time} onChange={handleChange} />
                            </div>
                            <div className="Filters__filterItem">
                                <label htmlFor="email" className="signup-labels">Email Address:</label>
                                <input type="email" id="email" name="email"
                                       className="TextField__PurpleOutline signup-fields" placeholder="Email Address"
                                       value={formData.email} onChange={handleChange} disabled />
                            </div>
                            <div className="Filters__filterItem">
                                <label htmlFor="password" className="signup-labels">Password:</label>
                                <input type="password" id="password" name="password"
                                       className="TextField__PurpleOutline signup-fields" placeholder="Password" onChange={handleChange} required />
                            </div>
                            <div className="Filters__filterItem">
                                <label htmlFor="password_confirm" className="signup-labels">Confirm Password:</label>
                                <input type="password" id="password_confirm" name="password_confirm"
                                       className="TextField__PurpleOutline signup-fields" placeholder="Confirm Password" onChange={handleChange} required />
                            </div>
                            <div className="Filters__filterItem">
                                <label htmlFor="description" className="signup-labels">Shelter Description:</label>
                                <textarea id="description" name="description"
                                       className="TextField__PurpleOutline Signup__description" placeholder="Shelter Description" value={formData.description} onChange={handleChange} required />
                            </div>
                            <div className="Filters__filterItem">
                                <label htmlFor="animals_offered" className="signup-labels">Animals Offered:</label>
                                <input id="animals_offered" name="description"
                                   className="TextField__PurpleOutline signup-fields" placeholder="Animals Offered" onChange={handleChange} required />
                            </div>
                            <div>
                                <label for="image">Image:</label>
                                <input type="file" id="image" name="image" class="TextField__PurpleOutline" onChange={handleImage}></input>
                            </div>
                            <div className="AccountDetails__buttons">
                                <Link to='/login'>
                                    <div className="signup-button">
                                        <button className="Button__redOutline signup-button" onClick={handleDelete}>Delete Account</button>
                                    </div>
                                </Link>
                                <Link to="/manage_shelter">
                                    <div className="signup-button">
                                        <button className="Button__purpleOutline signup-button" onClick={handleSubmit}>Update Account</button>
                                    </div>
                                </Link>
                            </div>
                            
                        </div>
                    </div>) : "Loading..."}
                </div>
            </div>
            </body>
    );
}