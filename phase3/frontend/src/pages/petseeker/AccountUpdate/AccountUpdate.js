import "../../signup/Signup.scss";
import "../../../BaseStyles.scss";
import "./AccountUpdate.scss";
import "../../petseeker/Search/SearchPage.scss";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteAccount,
  seekerUpdateAccount,
} from "../../../requests/accountUpdate";
import { getMe } from "../../../requests/authentication";
import { Link } from "react-router-dom";
import { formatErrors } from "../../../utils/formatErrors";

export function SeekerAccountUpdate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    dob: "",
    email: "",
    gender: "",
    postal_code: "",
    password: "",
    password_confirm: "",
  });
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState({});
  const [errorText, setErrorText] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      getMe()
        .then((response) => {
          setFormData(response.data);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchUserData();
  }, []);

  const GENDER_OPTIONS = [
    { value: "", label: "Select" },
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleImage = (event) => {
    setImage(event.target.files[0]);
  };

  const handleDelete = async () => {
    try {
      const response = await deleteAccount(formData.id);
      setErrorText(null);
      navigate("/");
    } catch (err) {
      setErrorText(formatErrors(err.response.data));
    }
  };

  const handleSubmit = async () => {
    try {
      let submitData = new FormData();
      for (const entry in formData) {
        submitData.append(entry, formData[entry]);
      }
      submitData.append("image", image);
      const response = await seekerUpdateAccount(formData.id, submitData);
      setErrorText(null);
      navigate("/search");
    } catch (err) {
      setErrorText(formatErrors(err.response.data));
    }
  };

  return (
    <body>
      <div className="PageContainer">
        <div className="Main">
          <h1>Edit Account Details</h1>
          {!loading ? (
            <div className="Signup__fields">
              <div className="Filters__form">
                <div className="Filters__filterItem">
                  <label htmlFor="first_name" className="signup-labels">
                    First Name:
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    className="TextField__PurpleOutline signup-fields"
                    placeholder="First Name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="Filters__filterItem">
                  <label htmlFor="last_name" className="signup-labels">
                    Last Name:
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    className="TextField__PurpleOutline signup-fields"
                    placeholder="Last Name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="Filters__filterItem">
                  <label htmlFor="dob" className="signup-labels">
                    Date of Birth:
                  </label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    className="TextField__PurpleOutline special-fields"
                    value={formData.dob}
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
                    value={formData.email}
                    onChange={handleChange}
                    disabled
                  />
                </div>
                <div className="Filters__filterItem">
                  <label htmlFor="gender" className="signup-labels">
                    Gender:
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    className="TextField__PurpleOutline special-fields"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    {GENDER_OPTIONS.map((option) =>
                      option.value === formData.gender ? (
                        <option
                          key={option.value}
                          value={option.value}
                          selected
                        >
                          {option.label}
                        </option>
                      ) : (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      )
                    )}
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
                    value={formData.postal_code}
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
                <div>
                  <label for="image">Image:</label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    class="TextField__PurpleOutline"
                    onChange={handleImage}
                  ></input>
                </div>
                <div className="AccountDetails__buttons">
                  <div className="signup-button">
                    <button
                      className="Button__redOutline signup-button"
                      onClick={handleDelete}
                    >
                      Delete Account
                    </button>
                  </div>
                  <div className="signup-button">
                    <button
                      className="Button__purpleOutline signup-button"
                      onClick={handleSubmit}
                    >
                      Update Account
                    </button>
                  </div>
                </div>
                {errorText && (
                  <div className="errorText">
                    <h6 className="show-red-text">{errorText}</h6>
                  </div>
                )}
              </div>
            </div>
          ) : (
            "Loading..."
          )}
        </div>
      </div>
    </body>
  );
}
