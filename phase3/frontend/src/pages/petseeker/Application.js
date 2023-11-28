import React from "react";
import "./ApplicationPage.scss";
import "../../BaseStyles.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";

export function Application(props) {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Perform actions with form data
  };

  return (
    <div className="PageContainer">
      <div className="center">
        <div className="info-card">
          <h2>Pet Adoption Form</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="yourName">Your Name:</label>
              <input
                type="text"
                className="form-control"
                id="yourName"
                placeholder="Enter your full name"
                required
                ref={register()}
              />
            </div>
            <div className="form-group">
              <label htmlFor="age">Your Age:</label>
              <input
                type="number"
                className="form-control"
                id="age"
                placeholder="Enter your age"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email address"
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
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="date-of-birth">Date of Birth:</label>
              <input
                type="date"
                className="form-control"
                id="date-of-birth"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Your Gender:</label>
              <select className="form-control" id="gender" required>
                <option value="">Select</option>
                <option value="dog">Male</option>
                <option value="cat">Female</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="occupation">Your Occupation:</label>
              <input
                type="text"
                className="form-control"
                id="occupation"
                placeholder="Enter your occupation"
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
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="numOfPets">Do you have any pets currently?</label>
              <select className="form-control" id="numOfPets" required>
                <option value="">Select</option>
                <option value="dog">0</option>
                <option value="cat">1</option>
                <option value="rabbit">2</option>
                <option value="other">3+</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="outdoorArea">
                Does your home have a yard or outdoor area?
              </label>
              <select className="form-control" id="outdoorArea" required>
                <option value="">Select</option>
                <option value="dog">Yes</option>
                <option value="cat">No</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="safeGuard">
                Are you willing to put safeguards in your home for your pet?
              </label>
              <select className="form-control" id="safeGuard" required>
                <option value="">Select</option>
                <option value="dog">Yes</option>
                <option value="cat">No</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="description">
                Enter a few reasons why you feel you would be good for adoption:
              </label>
              <textarea
                className="form-control"
                id="description"
                rows="4"
                placeholder="Enter 2-3 reasons"
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
