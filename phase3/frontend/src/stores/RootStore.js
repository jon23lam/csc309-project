import { makeAutoObservable, action } from "mobx";
import { PetListingsStore } from "./PetListingsStore";
import { StrayAnimalsStore } from "./StrayAnimalsStore"

export class RootStore {
  authStore;

  constructor(authStore) {
    this.authStore = authStore;
    this.petListingsStore = new PetListingsStore(this);
    this.strayAnimalsStore = new StrayAnimalsStore(this);
    this.latitude = null;
    this.longitude = null;
    this.locationOn = null;
    this.locationLoading = true;
    

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          this.locationOn = true;
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.locationLoading = false;
        },
        () => {
          this.locationOn = false;
          this.locationLoading = false;
        }
      );
    } else {
      this.locationLoading = false;
    }

    makeAutoObservable(this, {
      resetRootStore: action
    });
    
  }

  resetRootStore = () => {
    this.petListingsStore = new PetListingsStore(this);
    this.strayAnimalsStore = new StrayAnimalsStore(this);
  }

}

export default RootStore;
