import React from "react";
import "./Comments.scss";
import "../../../BaseStyles.scss";
import { observer } from "mobx-react";
import "../Applications/ApplicationsPage.scss";
import { Comments } from "./Comments";
import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getApplication, getApplicationUsers } from "../../../requests/applicationRequests";

export const CommentsPage = observer((props) => {
  const location = useLocation();
  const { state } = location;

  const [pet, setPet] = useState(state && state.pet);
  const [seekerUser, setSeekerUser] = useState(state && state.user);
  const [shelterUser, setShelterUser] = useState(state && state.shelterUser);
  const {applicationId} = useParams();

  useEffect(() => {
    const fetchUsers = async () => {
      if (!seekerUser || !shelterUser || !pet) {
        const response = await getApplicationUsers(applicationId)
        setSeekerUser({...response.data.seeker_user.fields, id: response.data.seeker_user.pk});
        setShelterUser({...response.data.shelter_user.fields, id: response.data.shelter_user.pk});
        setPet({...response.data.pet_listing.fields, id: response.data.pet_listing.pk, image: process.env.REACT_APP_BACKEND_BASE_URL+'/media/'+response.data.pet_listing.fields.image})
      }
    }
    
    fetchUsers()
  })

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
