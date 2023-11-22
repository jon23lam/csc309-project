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
      // loginUser: action
    });

    // this.isLoading = true;
    // this.isAuthenticated = true;
    // this.context = {};
  }

  setIsLoading = (isLoading) => {
    this.isLoading = isLoading;
  };


  loginUser = async (payload) => {
    let successfulLogin = false;
    try {
      const me = await authenticationService.signInUser({email: "acc1@gmail.com", password: "abc123"});
      // this.setContext(me);
      // this.setIsAuthenticated(true);
      console.log(me)
      successfulLogin = true;
    } catch (err) {
      // this.setContext({});
      // this.setIsAuthenticated(false);
      console.log(err)
    }

    this.setIsLoading(false);
    // return successfulLogin;
  };

  setContext = (context) => {
    this.context = context;
  };

  setIsAuthenticated = (isAuthenticated) => {
    this.isAuthenticated = isAuthenticated;
  };
}

export default AuthStore;
