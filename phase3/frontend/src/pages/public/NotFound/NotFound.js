import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RootStoreContext } from "../../../providers/RootProvider";
import { default as SadDog } from "../../../assets/sad-dog.webp";
import logo from "../../../assets/logo.png";

import "./NotFound.scss";
import "../../../BaseStyles.scss";

export function NotFound(props) {
  const navigate = useNavigate();
  const rootStore = useContext(RootStoreContext);
  const { authStore } = rootStore;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  function navigateToLogin() {
    navigate("/login");
  }

  return (
    <div className="PageContainer">
      <div className="Main">
        <div
          className="PetHubLogo"
          onClick={() => navigateToLogin()}
        >
          <img src={logo} alt="Pet Hub" className="logo-picture" />
        </div>
        <div className="NotFoundPage">
          <h1>Looks like you're lost buddy</h1>
          <img src={SadDog} alt="Pet Hub" className="sad-dog-image" />
          <h1>Page not found, please navigate back to where you came from</h1>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
