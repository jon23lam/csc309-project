import { makeAutoObservable } from "mobx";
import { PetListingsStore } from "./PetListingsStore";
import { ApplicationStore } from "./ApplicationStore";
import { SeekerShelterStore } from "./SeekerShelterStore";

export class RootStore {
  authStore;

  constructor(authStore) {
    this.authStore = authStore;
    this.petListingsStore = new PetListingsStore(this);
    this.applicationStore = new ApplicationStore(this);
    this.seekerShelterStore = new SeekerShelterStore(this);

    makeAutoObservable(this);
  }
}

export default RootStore;
