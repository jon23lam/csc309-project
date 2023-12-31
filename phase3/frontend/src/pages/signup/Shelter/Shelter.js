import "../Signup.scss";
import "../../../BaseStyles.scss";
import "../../petseeker/Search/SearchPage.scss";
import React, { useState } from "react";
import { signup } from "../../../requests/signup";
import { useNavigate } from "react-router-dom";
import { formatErrors } from "../../../utils/formatErrors";

export function ShelterSignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    shelter_name: "",
    phone_number: "",
    street_address: "",
    city: "",
    province: "",
    postal_code: "",
    email: "",
    password: "",
    password_confirm: "",
    description: "",
    animals_offered: "",
    role: "shelter",
  });

  const [errorText, setErrorText] = useState(null);

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
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleImage = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      let submitData = new FormData();
      for (const entry in formData) {
        submitData.append(entry, formData[entry]);
      }
      submitData.append("image", image);
      const response = await signup(submitData);
      if (response.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      console.log(err.response)
      setErrorText(formatErrors(err.response.data));
    }
  };

  return (
    <body>
      <div className="PageContainer">
        <div className="Main">
          <h1>Sign Up as Pet Shelter</h1>
          <div className="Signup__fields">
            <div className="Filters__form">
              <div className="Filters__filterItem">
                <label htmlFor="shelter_name" className="signup-labels">
                  Shelter Name:
                </label>
                <input
                  type="text"
                  id="shelter_name"
                  name="shelter_name"
                  className="TextField__PurpleOutline signup-fields"
                  placeholder="Shelter Name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="Filters__filterItem">
                <label htmlFor="phone_number" className="signup-labels">
                  Phone Number:
                </label>
                <input
                  type="text"
                  id="phone_number"
                  name="phone_number"
                  className="TextField__PurpleOutline signup-fields"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="Filters__filterItem">
                <label htmlFor="street_address" className="signup-labels">
                  Street Address:
                </label>
                <input
                  type="text"
                  id="street_address"
                  name="street_address"
                  className="TextField__PurpleOutline signup-fields"
                  placeholder="Street Address"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="Filters__filterItem">
                <label htmlFor="city" className="signup-labels">
                  City:
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="TextField__PurpleOutline signup-fields"
                  placeholder="City"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="Filters__filterItem">
                <label htmlFor="province" className="signup-labels">
                  Province:
                </label>
                <select
                  name="province"
                  id="province"
                  className="Dropdown__PurpleOutline signup-fields"
                  onChange={handleChange}
                >
                  {PROVINCE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="Filters__filterItem">
                <label htmlFor="postal_code" className="signup-labels">
                  Postal Code:
                </label>
                <input
                  type="text"
                  id="postal_code"
                  name="postal_code"
                  className="TextField__PurpleOutline signup-fields"
                  placeholder="Postal Code"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="Filters__filterItem">
                <label htmlFor="open_time" className="signup-labels">
                  Open Time:
                </label>
                <input
                  type="time"
                  id="open_time"
                  name="open_time"
                  className="TextField__PurpleOutline hour-fields"
                  onChange={handleChange}
                />
              </div>
              <div className="Filters__filterItem">
                <label htmlFor="close_time" className="signup-labels">
                  Close Time:
                </label>
                <input
                  type="time"
                  id="close_time"
                  name="close_time"
                  className="TextField__PurpleOutline hour-fields"
                  onChange={handleChange}
                />
              </div>
              <div className="Filters__filterItem">
                <label htmlFor="email" className="signup-labels">
                  Email Address:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="TextField__PurpleOutline signup-fields"
                  placeholder="Email Address"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="Filters__filterItem">
                <label htmlFor="password" className="signup-labels">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="TextField__PurpleOutline signup-fields"
                  placeholder="Password"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="Filters__filterItem">
                <label htmlFor="password_confirm" className="signup-labels">
                  Confirm Password:
                </label>
                <input
                  type="password"
                  id="password_confirm"
                  name="password_confirm"
                  className="TextField__PurpleOutline signup-fields"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="Filters__filterItem">
                <label htmlFor="description" className="signup-labels">
                  Shelter Description:
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="TextField__PurpleOutline Signup__description"
                  placeholder="Shelter Description"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="Filters__filterItem">
                <label htmlFor="animals_offered" className="signup-labels">
                  Animals Offered:
                </label>
                <input
                  id="animals_offered"
                  name="description"
                  className="TextField__PurpleOutline signup-fields"
                  placeholder="Animals Offered"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label for="image">Image:</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  className="TextField__PurpleOutline"
                  onChange={handleImage}
                ></input>
              </div>
              <div className="signup-button">
                <button
                  className="Button__purpleOutline signup-button"
                  onClick={handleSubmit}
                >
                  Sign Up
                </button>
              </div>
              {errorText && (
                <div className="errorText">
                  <h6 className="show-red-text">{errorText}</h6>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}
