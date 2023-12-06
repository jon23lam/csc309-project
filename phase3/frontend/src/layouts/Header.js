import React, { useEffect, useContext } from "react";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { RootStoreContext } from "../providers/RootProvider";
import logo from "../assets/logo.png";
import "../BaseStyles.scss";

export const Header = observer((props) => {
  const navigate = useNavigate();
  // So here we should use the RootStore/AuthStore to determine what kind of
  // User type the user is and customize the header to that user type
  const rootStore = useContext(RootStoreContext);
  const { authStore } = rootStore;

  async function logout() {
    // Add logout logic here
    await authStore.logoutUser()
    navigate("/login")
  }

  function navigateToHome() {
    // if shelter navigate to shelter management page
    // if petseeker navigate to search page
    navigate("/search")
  }

  function navigateToStrayAnimals() {
    navigate("/stray_animal_locator")
  }

  return (
    <header>
      <div
        className="Header__logo"
        onClick={() => navigateToHome()}
      >
        <img src={logo} alt="Pet Hub" className="logo-picture" />
      </div>
      <div className="Header__navButtons">
        <a className="HeaderItem__active" href="../Search/SearchPage.html">
          Search
        </a>
        <a
          className="HeaderItem"
        >
          Manage Account
        </a>
        <div className="HeaderItem__manage">
          <div className="Notification__button">
            <div className="Notification__dot"></div>
            <button 
              // Add onclick for notifications
              className="dropbtn">
              Notifications
            </button>
            <div id="notificationsDropdown" className="Notification__dropdown">
              {/* Put notifications here */}

              <div
                className="Notification__seeAll"
                // onClick="location.href='../Notifications/Notifications.html';"
              >
                <div className="Notification__seeAllText">
                  See all notifications
                </div>
              </div>
            </div>
          </div>
          <button 
            className="Button__purpleOutline"
            onClick={() => navigateToStrayAnimals()}
          >
            Stray Animals
          </button>
          <button
            className="Button__purple"
            onClick={() => logout()}
          >
            Log Out
          </button>
        </div>
      </div>
    </header>
  );
});

export default Header;
