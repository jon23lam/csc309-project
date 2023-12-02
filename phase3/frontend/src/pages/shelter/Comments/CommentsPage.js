import React from "react";
import "./Comments.scss";
import "../../../BaseStyles.scss";
import { observer } from "mobx-react";
import "../Applications/ApplicationsPage.scss";
import { Comments } from "./Comments";
import { useLocation } from "react-router-dom";

export const CommentsPage = observer((props) => {
  const location = useLocation();
  const { state } = location;
  const seekerUser = state && state.user;
  const shelterUser = state && state.shelterUser;
  const pet = state && state.pet;

  console.log(shelterUser);
  return (
    <div className="PageContainer">
      <div className="Main">
        <h1 className="HeaderText">Messages</h1>
        <div className="ApplicationsPage">
          <div className="MessagePage__messagesWrapper">
            <div className="Application__leftCol">
              <div className="Application__photoWrapper">
                {pet && pet.image && (
                  <img
                    src={pet.image}
                    alt="Pet Photo"
                    className="Application__photo"
                  />
                )}
              </div>
              <div className="Application__generalInfo">
                <h5 className="Application__contact">Contact:</h5>
                {seekerUser && seekerUser.email && (
                  <a
                    className="Application__email"
                    href={`mailto:${seekerUser.email}`}
                  >
                    {seekerUser.email}
                  </a>
                )}
                {seekerUser && seekerUser.phone && (
                  <a
                    className="Application__phone"
                    href={`tel:${seekerUser.phone}`}
                  >
                    {seekerUser.phone}
                  </a>
                )}
                {seekerUser && seekerUser.street_address && (
                  <h5 className="Application__address">
                    Address: {seekerUser.street_address}
                  </h5>
                )}
                {seekerUser && seekerUser.dob && (
                  <h5 className="Application__dob">
                    Date of birth: {seekerUser.dob}
                  </h5>
                )}
                {seekerUser && seekerUser.gender && (
                  <h5 className="Application__gender">
                    Gender: {seekerUser.gender}
                  </h5>
                )}
              </div>
            </div>

            <Comments seekerUser={seekerUser} shelterUser={shelterUser} />
          </div>
        </div>
      </div>
    </div>
  );
});
