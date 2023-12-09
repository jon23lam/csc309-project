import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./AdoptionForm.scss";
import "../../../BaseStyles.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { axiosGet, axiosPost } from "../../../requests/axiosRequests";
import authStore, { AuthStore } from "../../../stores/AuthStore";
import { observer } from "mobx-react";
import { RootStoreContext } from "../../../providers/RootProvider";

const GENDER_OPTIONS = [
  { value: "", label: "Select" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const NUM_OF_PETS_OPTIONS = [
  { value: "", label: "Select" },
  { value: "0", label: "0" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3+", label: "3+" },
];

const OUTDOOR_AREA_OPTIONS = [
  { value: "", label: "Select" },
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

const SAFE_GUARD_OPTIONS = [
  { value: "", label: "Select" },
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

export const AdoptionForm = observer((props) => {
  const rootStore = useContext(RootStoreContext);
  const { authStore } = rootStore;
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    yourName: "",
    age: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    occupation: "",
    salary: "",
    existing_pets: "",
    home_yard: "",
    safe_Guard: "",
    message: "",
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(true); // Updated initial state

  const [buttonClicked, setButtonClicked] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await authStore.retrieveCurrentUserContext();
        setUser(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });

    setValidationErrors((prevErrors) => ({ ...prevErrors, [id]: null }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setButtonClicked(true);

    const formIsValid = validateForm();
    setIsFormValid(formIsValid);

    if (!formIsValid) {
      console.error("Form validation failed");
      return;
    }

    try {
      await createApplication(formData);
      console.log("AdoptionForm submitted successfully!");

      setButtonClicked(false);

      navigate(`/applications/`);
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };

  const createApplication = async (formData) => {
    try {
      const response = await axiosPost(
        `http://localhost:8000/api/applications/petlisting/${id}/application/`,
        formData,
      );
      console.log(response.data);
    } catch (error) {
      throw error;
    }
  };

  const validateForm = () => {
    const errors = {};

    setValidationErrors(errors);
    console.log(errors);
    const formIsValid = Object.keys(errors).length === 0;
    setIsFormValid(formIsValid);

    return formIsValid;
  };

  return (
    <div className="PageContainer">
      <div className="center">
        <div className="info-card">
          <h2>Pet Adoption Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="yourName">Your Name:</label>
              <input
                type="text"
                className="form-control"
                id="yourName"
                onChange={handleChange}
                value={
                  user && user.first_name && user.last_name
                    ? `${user.first_name} ${user.last_name}`
                    : ""
                }
                readOnly
                required
              />
              {validationErrors.yourName && (
                <span className="AdoptionForm__validationError">
                  {validationErrors.yourName}
                </span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="age">Your Age:</label>
              <input
                type="number"
                className="form-control"
                id="age"
                placeholder="Enter your age"
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email address"
                value={user && user.email ? user.email : ""}
                readOnly
                onChange={handleChange}
                required
              />
              {validationErrors.email && (
                <span className="AdoptionForm__validationError">
                  {validationErrors.email}
                </span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number:</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                placeholder="Enter your phone number"
                onChange={handleChange}
                value={user && user.phone_number ? user.phone_number : ""}
                readOnly
                required
              />
              {validationErrors.phone && (
                <span className="AdoptionForm__validationError">
                  {validationErrors.phone}
                </span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="address">Your Address:</label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="Enter your address"
                onChange={handleChange}
                value={user && user.street_address ? user.street_address : ""}
                readOnly
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="gender">Your Gender:</label>
              <select
                className="form-control"
                id="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                {GENDER_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="occupation">Your Occupation:</label>
              <input
                type="text"
                className="form-control"
                id="occupation"
                placeholder="Enter your occupation"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="salary">Your Estimated Salary:</label>
              <input
                type="text"
                className="form-control"
                id="salary"
                placeholder="Enter your estimated salary"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="existing_pets">
                Do you have any pets currently?
              </label>
              <select
                className="form-control"
                id="existing_pets"
                value={formData.existing_pets}
                onChange={handleChange}
                required
              >
                {NUM_OF_PETS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="home_yard">
                Does your home have a yard or outdoor area?
              </label>
              <select
                className="form-control"
                id="home_yard"
                value={formData.home_yard}
                onChange={handleChange}
                required
              >
                {OUTDOOR_AREA_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="safe_Guard">
                Are you willing to put safeguards in your home for your pet?
              </label>
              <select
                className="form-control"
                id="safe_Guard"
                value={formData.safe_Guard}
                onChange={handleChange}
                required
              >
                {SAFE_GUARD_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="message">
                Enter a few reasons why you feel you would be good for adoption:
              </label>
              <textarea
                className="form-control"
                id="message"
                rows="4"
                placeholder="Enter 2-3 reasons"
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="center">
              <button
                type="submit"
                className={`Button__purpleOutline ${
                  !isFormValid && buttonClicked ? "disabled" : ""
                }`}
              >
                Send Application
              </button>

              {!isFormValid && buttonClicked && (
                <p className="AdoptionForm__errorMessage">
                  Please fill out all required fields correctly.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});
