import { action, makeObservable, observable } from "mobx";
import * as authenticationService from "../requests/authentication";
import * as seekers from "../requests/seekers";

export class SeekerShelterStore {
  user = {};
  isLoading = false;

  constructor() {
    makeObservable(this, {
      user: observable,
      isLoading: observable,
      setIsLoading: action,
      setUser: action,
    });
  }

  setIsLoading = (isLoading) => {
    this.isLoading = isLoading;
  };

  setUser = (user) => {
    this.user = user;
  };

  retrieveSeekerUser = async (userId) => {
    this.setIsLoading(true);

    try {
      const response = await seekers.getSeeker(userId);
      const user = response.data; // Extract user data from the response
      this.setUser(user); // Set the user data in the store
      return user; // Return the user data
    } catch (err) {
      console.error("Failed to get seeker", err);
      throw err; // Rethrow the error to propagate it
    } finally {
      this.setIsLoading(false);
    }
  };
}
