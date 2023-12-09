import { action, makeObservable, observable } from "mobx";
import * as commentsService from "../requests/commentsRequests";
import * as authenticationService from "../requests/authentication";
import * as seekers from "../requests/seekers";
import shelters from "../requests/shelters";

export class SeekerShelterStore {
  user = {};
  isLoading = false;
  shelterReviews = []
  reviewCount = 0;
  

  constructor() {
    makeObservable(this, {
      user: observable,
      isLoading: observable,
      shelterReviews: observable,
      reviewCount: observable,
      setIsLoading: action,
      setUser: action,
      setShelterReviews: action
    });
  }

  setIsLoading = (isLoading) => {
    this.isLoading = isLoading;
  };

  setUser = (user) => {
    this.user = user;
  };

  setShelterReviews = (shelterReviews) => {
    this.shelterReviews = shelterReviews;
  };

  setShelterReviewCount = (count) => {
    this.reviewCount = count;
  }

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

  retrieveShelterUser = async (userId) => {
    this.setIsLoading(true);

    try {
      const response = await shelters.getShelter(userId);
      const user = response.data;
      this.setUser(user);
      return user;
    } catch (err) {
      console.error("Failed to get shelter", err);
      throw err;
    } finally {
      this.setIsLoading(false);
    }
  };

  getShelterReviews = async (shelterId) => {
    this.setIsLoading(true);

    try {
      const response = await commentsService.getShelterComments(shelterId);

      const { count, results, next } = response.data;

      this.setShelterReviewCount(count);
      this.setShelterReviews(results);
    } catch (err) {
      console.log("failed to get comments");
    }

    this.setIsLoading(false);
  };

  createShelterReview = async (shelterId, formData) => {
    this.setIsLoading(true);

    try {
      // Post the new comment
      const response = await commentsService.postShelterComment(
        shelterId,
        formData,
      );

      const newComment = response.data;

      this.shelterReviews.push(newComment);

      this.setShelterReviewCount += 1;
    } catch (error) {
      console.log("Failed to post comment", error);
    }

    this.setIsLoading(false);
  };
}
