import React from "react";
import "./Comments.scss";
import "../../../BaseStyles.scss";
import { observer } from "mobx-react";
import "../Applications/ApplicationsPage.scss";
import { Comments } from "./Comments";

export const CommentsPage = observer((props) => {
  //I should add the user info here too

  return (
    <div className="PageContainer">
      <div className="Main">
        <h1 className="HeaderText">Message Spongeboi:</h1>
        <div className="ApplicationsPage">
          <div className="MessagePage__messagesWrapper">
            <div className="Application__leftCol">
              <div className="Application__photoWrapper">
                <img
                  src="../../assets/spongebob.jpeg"
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
                  spongeboi.xins@gmail.com
                </a>
                <a className="Application__phone" href="tel:508-314-4977">
                  (508)-314-4977
                </a>
                <h5 className="Application__address">
                  120 Homewood Ave, Toronto, ON
                </h5>
                <h5 className="Application__dob">
                  Date of birth: July 8th, 2001
                </h5>
                <h5 className="Application__gender">Gender: Male</h5>
              </div>
            </div>
            <Comments />
          </div>
        </div>
      </div>
    </div>
  );
});
