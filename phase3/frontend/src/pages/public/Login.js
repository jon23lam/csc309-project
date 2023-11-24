import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RootStoreContext } from "../../providers/RootProvider";

import "./Login.scss";
import "../../BaseStyles.scss";

export function Login(props) {
  const navigate = useNavigate();
  const rootStore = useContext(RootStoreContext);
  const { authStore } = rootStore;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  async function onClick() {
    const payload = {
      email: email,
      password: password,
    };

    const loginResult = await authStore.loginUser(payload);

    const { loggedIn, message } = loginResult;

    if (loggedIn) {
      navigateToSearch();
    } else {
      setErrorMessage(message);
      setShowErrorMessage(true);
    }
  }

  const navigateToSearch = () => {
    navigate("/search");
  };

  return (
    <div className="PageContainer">
      <div className="Main">
        <h1>Login to Pet Adoption</h1>
        <div className="Login__fields">
          <div className="Filters__form">
            <div className="Filters__filterItem">
              <label htmlFor="email" className="login-labels">
                Email Address:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email Address"
                className="TextField__PurpleOutline login-fields"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="Filters__filterItem">
              <label htmlFor="password" className="login-labels">
                Password:
              </label>
              <input
                type="text"
                id="password"
                name="password"
                placeholder="Password"
                className="TextField__PurpleOutline login-fields"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="login-button">
              <button
                className="Button__purpleOutline login-button"
                onClick={onClick}
              >
                Log In
              </button>
            </div>
          </div>
          {showErrorMessage && <p className="error">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;
