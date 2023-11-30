import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./ApplicationPage.scss";
import "../../../BaseStyles.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { axiosPost } from "../../../requests/axiosRequests";

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

export function Application(props) {
  const { id } = useParams();
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

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await createApplication(formData);
      console.log("Application submitted successfully!");
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
                placeholder="Enter your full name"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="age">Your Age:</label>
              <input
                type="number"
                className="form-control"
                id="age"
                placeholder="Enter your age"
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
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number:</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                placeholder="Enter your phone number"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Your Address:</label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="Enter your address"
                onChange={handleChange}
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
              <button type="submit" className="Button__purple">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
