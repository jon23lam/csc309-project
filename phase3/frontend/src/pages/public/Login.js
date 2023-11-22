import React, { useState, useEffect, useContext } from 'react';
import { inject, observer } from "mobx-react";
import { AuthStore } from "../../stores/AuthStore"
import { RootStoreContext } from '../../providers/RootProvider';



import "./Login.scss"


export function Login(props) {
  const rootStore = useContext(RootStoreContext);
  const { authStore } = rootStore;

  async function onClick(event) {
    await authStore.loginUser();
  }


  return (
    <div class="PageContainer">
    <div class="Main">
      <h1>Login to Pet Adoption</h1>
      <div class="Login__fields">
        <div class="Filters__form">
          <div class="Filters__filterItem">
            <label for="email" class="login-labels">Email Address:</label>
            <input type="email" id="email" name="email" placeholder="Email Address" class="TextField__PurpleOutline login-fields" />
          </div>
          <div class="Filters__filterItem">
            <label for="password" class="login-labels">Password:</label>
            <input type="text" id="password" name="password" placeholder="Password" class="TextField__PurpleOutline login-fields" />
          </div>
          <div class="login-button">
            <button class="Button__purpleOutline login-button"
            onClick={onClick}>Log In</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login;