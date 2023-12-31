import { action, makeObservable, observable } from "mobx";
import * as petListingsService from "../requests/petListings";

export class PetListingsStore {
  petList = [];
  petCount = 0;
  isLoading = false;
  nextPage = null;

  constructor() {
    makeObservable(this, {
      petList: observable,
      isLoading: observable,
      petCount: observable,
      nextPage: observable,
      setIsLoading: action,
      setPetCount: action,
      setPetList: action,
      setNextPage: action,
      removePetById: action
    });
  }

  setIsLoading = (isLoading) => {
    this.isLoading = isLoading;
  };

  setPetList = (petList) => {
    this.petList = petList;
  };

  setPetCount = (petCount) => {
    this.petCount = petCount;
  };

  setNextPage = (nextPage) => {
    this.nextPage = nextPage;
  };

  extendPetList = (petList) => {
    this.petList = [...this.petList, ...petList];
  };

  extendPetCount = (petCount) => {
    this.petCount = this.petCount + petCount;
  };

  removePetById = (petId) => {
    this.petList = this.petList.filter(pet => pet.id !== petId);
  }

  initializeSearchPage = async (userId) => {
    this.setIsLoading(true);

    try {
      const response = await petListingsService.getInitialPetListings();

      const { count, results, next } = response.data;

      this.setPetCount(count);
      this.setPetList(results);
      if (next) {
        this.setNextPage(next)
      } else {
        this.setNextPage(null)
      }
    } catch (err) {
      console.log("failed to get petlistings");
    }

    this.setIsLoading(false);
};

  initializeShelterManagementPage = async (listerId) => {
    this.setIsLoading(true);

    try {
      const response = await petListingsService.getPetListings({ filters: {"lister": listerId, "status": "any"} });

      const { count, results, next } = response.data;

      this.setPetCount(count);
      this.setPetList(results);
      if (next) {
        this.setNextPage(next);
      } else {
        this.setNextPage(null);
      }
    } catch (err) {
      console.log("failed to get petlistings");
    }

    this.setIsLoading(false);
  };

  getPetListingsFiltered = async (filters) => {
    this.setIsLoading(true);

    try {
      const response = await petListingsService.getPetListings(filters);

      const { count, results, next } = response.data;

      this.setPetCount(count);
      this.setPetList(results);

      if (next) {
        this.setNextPage(next);
      } else {
        this.setNextPage(null)
      }
    } catch (err) {
      console.log("failed to get petlistings");
    }

    this.setIsLoading(false);
  }

  getPetListingsNextPage = async () => {
    this.setIsLoading(true);

    try {
      const response = await petListingsService.getPetListingsNextPage(
        this.nextPage,
      );

      const { count, results, next } = response.data;

      this.extendPetCount(count);
      this.extendPetList(results);

      if (next) {
        this.setNextPage(next);
      } else {
        this.setNextPage(null);
      }
    } catch (err) {
      console.log("failed to get petlistings");
    }

    this.setIsLoading(false);
  };

  getPetListingObj = async (listingId) => {
    this.setIsLoading(true);

    try {
      const response = await petListingsService.getPetListing(listingId);
      const listing = response.data;

      this.setIsLoading(false);
      return listing;
    } catch (err) {
      console.log("failed to get petlisting");
    }

    this.setIsLoading(false);
  };

  deletePetListing = async (listingId) => {
    this.setIsLoading(true);

    try {
      await petListingsService.deletePetListing(listingId);

      this.removePetById(listingId)
      this.setIsLoading(false);
      return true;
    } catch (err) {
      this.setIsLoading(false)
      return false;
    }
  }
}

export default PetListingsStore;
