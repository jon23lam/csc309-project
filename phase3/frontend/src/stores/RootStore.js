import { action, computed, makeAutoObservable, observable } from "mobx";

export class RootStore {
  authStore;

  constructor(authStore) {
    this.authStore = authStore;

  

    makeAutoObservable(this);
  }


}

export default RootStore;