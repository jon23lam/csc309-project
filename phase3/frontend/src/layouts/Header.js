import React, { useEffect, useContext, useState } from "react";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { RootStoreContext } from "../providers/RootProvider";
import logo from "../assets/logo.png";
import { ROLE_SHELTER, ROLE_SEEKER } from "../stores/AuthStore";

import "../BaseStyles.scss";

export const Header = observer((props) => {
  const navigate = useNavigate();
  const rootStore = useContext(RootStoreContext);
  const { authStore } = rootStore;
  const { context } = authStore;
  const { currentUser } = context;

  const [role, setRole] = useState(ROLE_SEEKER);

  useEffect(() => {
    if (currentUser) {
      setRole(currentUser.role);
    }
  }, [currentUser]);

  async function logout() {
    await authStore.logoutUser()
    rootStore.resetRootStore()
    navigate("/login")
  }

  function navigateToHome() {
    if (role == ROLE_SEEKER) {
      navigate("/search/list/")
    } else {
      navigate("/manage_shelter")
    }
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
