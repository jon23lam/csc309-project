import { action, makeObservable, observable } from "mobx";
import * as strayAnimalsService from "../requests/strayAnimals";

export class StrayAnimalsStore {
  strayAnimals = [];
  isLoading = false;

  constructor() {
    makeObservable(this, {
      strayAnimals: observable,
      isLoading: observable,
      setIsLoading: action,
      setStrayAnimals: action,
      extendStrayAnimals: action,
      updateAnimalsList: action
    });
  }

  setIsLoading = (isLoading) => {
    this.isLoading = isLoading;
  };

  setStrayAnimals = (strayAnimals) => {
    this.strayAnimals = strayAnimals;
  };

  extendStrayAnimals = (strayAnimal) => {
    const newList = [...this.strayAnimals]
    newList.push(strayAnimal)
    this.strayAnimals = newList;
  }

  updateAnimalsList = (strayAnimal) => {
    const newList = [...this.strayAnimals]
    newList[newList.findIndex(animal => animal.id === strayAnimal.id)] = strayAnimal;

    this.strayAnimals = newList;
  }

  initializePage = async (params) => {
    this.setIsLoading(true);

    try {
      const response = await strayAnimalsService.getStrayAnimals(params);

      this.setStrayAnimals(response.data);
    } catch (err) {
      console.log("failed to get stray animals");
    }

    this.setIsLoading(false);
  };

  createStrayAnimal = async (payload) => {
    this.setIsLoading(true);

    try {
      const response = await strayAnimalsService.postStrayAnimal(payload);

      this.extendStrayAnimals(response.data);
    } catch (err) {
      console.log("failed to post");
    }

    this.setIsLoading(false);
  }

  updateStrayAnimal = async (id, payload) => {
    this.setIsLoading(true);

    try {
      const response = await strayAnimalsService.updateStrayAnimal(id, payload);
      
      this.updateAnimalsList(response.data);
    } catch (err) {
      console.log("failed to update stray animal");
    }

    this.setIsLoading(false);
  }
}

export default StrayAnimalsStore;
