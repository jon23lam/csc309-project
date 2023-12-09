import "../Signup.scss"
import "../../../BaseStyles.scss"
import React, {useState} from "react";
import {signup} from "../../../requests/signup"
import {redirect} from "react-router-dom";

export function SeekerSignup() {

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        dob: "",
        email: "",
        gender: "",
        postal_code: "",
        password: "",
        password_confirm: "",
        role: "seeker"
    });

    const GENDER_OPTIONS = [
        { value: "", label: "Select" },
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
    ];

    const handleChange = (event) => {
        const {id, value} = event.target;
        setFormData({...formData, [id]: value});
    }

    const handleSubmit = async () => {
        try {
            const response = await signup(formData);
            if (response.status === 200) {
                redirect("/search");
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <body>
        <div className="PageContainer">
            <div className="Main">
                <h1>Sign Up as Pet Seeker</h1>
                <div className="Signup__fields">
                    <div className="Filters__form">
                        <div className="Filters__filterItem">
                            <label htmlFor="first_name" className="signup-labels">First Name:</label>
                            <input type="text" id="first_name" name="first_name"
                                   className="TextField__PurpleOutline signup-fields" placeholder="First Name"
                                   onChange={handleChange} required/>
                        </div>
                        <div className="Filters__filterItem">
                            <label htmlFor="last_name" className="signup-labels">Last Name:</label>
                            <input type="text" id="last_name" name="last_name"
                                   className="TextField__PurpleOutline signup-fields" placeholder="Last Name" onChange={handleChange} required />
                        </div>
                        <div className="Filters__filterItem">
                            <label htmlFor="dob" className="signup-labels">Date of Birth:</label>
                            <input type="date" id="dob" name="dob" className="TextField__PurpleOutline special-fields" onChange={handleChange} />
                        </div>
                        <div className="Filters__filterItem">
                            <label htmlFor="email" className="signup-labels">Email Address:</label>
                            <input type="email" id="email" name="email"
                                   className="TextField__PurpleOutline signup-fields" placeholder="Email Address"
                                   onChange={handleChange} required />
                        </div>
                        <div className="Filters__filterItem">
                            <label htmlFor="gender" className="signup-labels">Gender:</label>
                            <select id="gender" name="gender" className="TextField__PurpleOutline special-fields"
                                    value={formData.gender} onChange={handleChange} required>
                                {GENDER_OPTIONS.map((option) => (
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
                                   onChange={handleChange} required />
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
                        <div className="signup-button">
                            <button className="Button__purpleOutline signup-button" onClick={handleSubmit}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </body>
    );
}