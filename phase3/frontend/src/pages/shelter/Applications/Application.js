import React from "react";
import { observer } from "mobx-react";

import "./ApplicationsPage.scss";
import "../../../BaseStyles.scss";
export const Application = observer((props) => {
  const { applicationInfo } = props;
  const {
    // id,
    status,
    occupation,
    salary,
    message,
    // applicant,
    // pet_listing,
    // shelter,
  } = applicationInfo;

  //Figure out how to also get the pet listing and seeker info

  return (
    <div className="ApplicationsPage__application">
      <div className="Application__leftCol">
        <div className="Application__photoWrapper">
          <img
            src="Leeney01-726.jpg"
            alt="Pet Photo"
            className="Application__photo"
          />
        </div>
        <div className="Application__generalInfo">
          <h5 className="Application__contact">Contact:</h5>
          <a
            className="Application__email"
            href="mailto:Spongeboi.xins@gmail.com"
          >
            Spongeboi.xins@gmail.com
          </a>
          <a className="Application__phone" href="tel:508-314-4977">
            (508)-314-4977
          </a>
          <h5 className="Application__address">
            120 Homewood Ave, Toronto, ON
          </h5>
          <h5 className="Application__dob">Date of birth: July 8th, 2001</h5>
          <h5 className="Application__gender">Gender: Male</h5>
        </div>
      </div>
      <div className="Application__mainCol">
        <h2 className="Application__name">Spongeboi Xins</h2>
        <h5 className="Application__status">
          <b>
            <u>Status:</u>
          </b>{" "}
          {status}
        </h5>
        <h5 className="Application__location">
          <b>
            <u>Location:</u>
          </b>{" "}
          Toronto, Onatrio
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
          <button className="Button__purpleOutline">Deny Application</button>
          <button
            className="Button__purple"
            onClick="location.href='./MessagesPage.html';"
          >
            Message Spongeboi
          </button>
        </div>
      </div>
    </div>
  );
});
