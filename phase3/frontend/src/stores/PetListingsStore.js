import { action, makeObservable, observable } from "mobx";
import * as petListingsService from "../requests/petListings";

export class PetListingsStore {
  petList = [];
  petCount = 0;
  isLoading = false;

  constructor() {
    makeObservable(this, {
      petList: observable,
      isLoading: observable,
      petCount: observable,
      setIsLoading: action,
      setPetCount: action,
      setPetList: action,
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

  initializeSearchPage = async () => {
    this.setIsLoading(true);

    try {
      const response = await petListingsService.getPetListings();

      const { count, results } = response.data;

      this.setPetCount(count);
      this.setPetList(results);

      console.log(results);
    } catch (err) {
      console.log("failed to get shelters");
    }

    this.setIsLoading(false);
  };
}

export default PetListingsStore;
