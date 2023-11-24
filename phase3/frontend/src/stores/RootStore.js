import { makeAutoObservable } from "mobx";
import { PetListingsStore } from "./PetListingsStore";

export class RootStore {
  authStore;

  constructor(authStore) {
    this.authStore = authStore;
    this.petListingsStore = new PetListingsStore(this);

    makeAutoObservable(this);
  }
}

export default RootStore;
