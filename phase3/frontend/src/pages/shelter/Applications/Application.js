import React, { useState } from "react";
import { observer } from "mobx-react";
import { RootStoreContext } from "../../../providers/RootProvider";
import { useContext } from "react";
import { useEffect } from "react";

import "./ApplicationsPage.scss";
import "../../../BaseStyles.scss";
import ApplicationStore from "../../../stores/ApplicationStore";
import { Link, useNavigate } from "react-router-dom";

export const Application = observer((props) => {
  const rootStore = useContext(RootStoreContext);
  const { seekerShelterStore } = rootStore;
  const { petListingsStore } = rootStore;
  const { authStore } = rootStore;
  const { applicationStore } = rootStore;
  const [buttonClicked, setButtonClicked] = useState(false);

  const { applicationInfo } = props;
  const {
    id,
    status,
    occupation,
    salary,
    message,
    applicant,
    pet_listing,
    shelter,
    created_at,
  } = applicationInfo;

  const [user, setUser] = useState(null);
  const [pet, setPet] = useState(null);
  const [curr_user, setCurrUser] = useState(null);
  const [shelterUser, setShelterUser] = useState(null);

  const timestamp = created_at;

  const formattedDate = new Date(timestamp).toLocaleDateString("en-US");
  const formattedTime = new Date(timestamp).toLocaleTimeString("en-US");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await seekerShelterStore.retrieveSeekerUser(applicant);
        setUser(userData);
        const petData = await petListingsStore.getPetListingObj(pet_listing);
        setPet(petData);
        const currUserData = await authStore.retrieveCurrentUserContext();
        setCurrUser(currUserData);
        const shelterUserData =
          await seekerShelterStore.retrieveShelterUser(shelter);
        setShelterUser(shelterUserData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [applicant, seekerShelterStore]);

  const navigate = useNavigate();
  const handleNavigateToMessages = () => {
    navigate(`${id}/messages/`, {
      state: { user, curr_user, pet, shelterUser },
    });
  };

  const handleUpdateNavigation = async (id, formData) => {
    try {
      await applicationStore.updateApplication(id, formData);
      setButtonClicked(true);
    } catch (error) {
      console.error("Error updating application:", error);
    }
  };

  return (
    <div className="ApplicationsPage__application">
      <div className="Application__leftCol">
        <div className="Application__photoWrapper">
          {pet && pet.image && (
            <img
              src={pet.image}
              alt="User Photo"
              className="Application__photo"
            />
          )}
        </div>
        <div className="Application__generalInfo">
          <h5 className="Application__contact">Contact:</h5>
          {user && user.email && (
            <a className="Application__email" href={`mailto:${user.email}`}>
              Email: {user.email}
            </a>
          )}
          {user && user.phone && (
            <a className="Application__phone" href={`tel:${user.phone}`}>
              {user.phone}
            </a>
          )}
          {user && user.street_address && (
            <h5 className="Application__address">
              Address: {user.street_address}
            </h5>
          )}
          {user && user.dob && (
            <h5 className="Application__dob">Date of birth: {user.dob}</h5>
          )}
          {user && user.gender && (
            <h5 className="Application__gender">Gender: {user.gender}</h5>
          )}
        </div>
      </div>
      <div className="Application__mainCol">
        {user && user.first_name && user.last_name && (
          <h2 className="Application__name">
            {user.first_name} {user.last_name}
          </h2>
        )}
        <h5 className="Application__status">
          <b>
            <u>Status:</u>
          </b>{" "}
          {status}
        </h5>
        <h5 className="Application__status">
          <b>
            <u>Date Created:</u>
          </b>{" "}
          {formattedDate} at {formattedTime}
        </h5>

        <h5 className="Application__occupation">
          <b>
            <u>Occupation:</u>
          </b>{" "}
          {occupation}
        </h5>
        <h5 className="Application__salary">
          <b>
            <u>Estimated Salary:</u>
          </b>{" "}
          {salary}
        </h5>
        <h5 className="Application__initialMessage">
          <b>
            <u>Application Message:</u>
          </b>{" "}
          {message}
        </h5>
        <div className="Application__actions">
          {curr_user &&
            curr_user.role === "shelter" &&
            status === "pending" && (
              <>
                <button
                  className="Button__purpleOutline"
                  onClick={() =>
                    handleUpdateNavigation(id, { status: "denied" })
                  }
                  disabled={buttonClicked}
                >
                  Deny Application
                </button>
                <button
                  className="Button__purple"
                  onClick={() =>
                    handleUpdateNavigation(id, {
                      status: "approved",
                    })
                  }
                  disabled={buttonClicked}
                >
                  Accept Application
                </button>
              </>
            )}
          {curr_user && curr_user.role === "seeker" && status === "pending" && (
            <button
              className="Button__purpleOutline"
              onClick={() =>
                handleUpdateNavigation(id, { status: "withdrawn" })
              }
              disabled={buttonClicked}
            >
              Withdraw Application
            </button>
          )}

          <button className="Button__purple" onClick={handleNavigateToMessages}>
            Message {user && user.name ? user.name : "User"}
          </button>
        </div>
      </div>
    </div>
  );
});
