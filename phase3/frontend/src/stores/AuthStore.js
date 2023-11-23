import { action, makeObservable, observable } from "mobx";
import * as authenticationService from "../requests/authentication";

export class AuthStore {
  context = {};
  isLoading = true;
  isAuthenticated = true;

  constructor() {
    makeObservable(this, {
      context: observable,
      isLoading: observable,
      isAuthenticated: observable,
      setIsLoading: action,
      setContext: action,
      setIsAuthenticated: action,
    });

    this.retrieveCurrentUserContext();
  }

  setIsLoading = (isLoading) => {
    this.isLoading = isLoading;
  };

  setContext = (context) => {
    this.context = context;
  };

  setIsAuthenticated = (isAuthenticated) => {
    this.isAuthenticated = isAuthenticated;
  };

  loginUser = async (payload) => {
    let successfulLogin = false;
    let message = "Email/Password invliad";

    try {
      const response = await authenticationService.signInUser(payload);
      const { access } = response.data;

      if (access) {
        localStorage.setItem("accessToken", access);

        const user = await authenticationService.getMe();

        this.setContext({ currentUser: user.data });
        this.setIsAuthenticated(true);
        successfulLogin = true;
        message = "Success";
      } else {
        this.setContext({});
        this.setIsAuthenticated(false);
      }
    } catch (err) {
      this.setContext({});
      this.setIsAuthenticated(false);
    }

    this.setIsLoading(false);

    return { loggedIn: successfulLogin, message: message };
  };

  retrieveCurrentUserContext = async () => {
    try {
      const access = localStorage.getItem("accessToken");
      console.log(access);
      if (access) {
        const user = await authenticationService.getMe();
        console.log(user);

        this.setContext({ currentUser: user.data });
        this.setIsAuthenticated(true);
      }
    } catch (err) {
      console.log("cant get user");
      this.setIsAuthenticated(false);
    }

    this.setIsLoading(false);
  };
}

export default AuthStore;
