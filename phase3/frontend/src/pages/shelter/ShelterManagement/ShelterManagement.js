import React, { useEffect, useContext, useState } from "react";
import { observer } from "mobx-react";
import { RootStoreContext } from "../../../providers/RootProvider";
import { ShelterListing } from "./ShelterListing";
import AddSvg from "../../../assets/svgs/icon_plus.svg"

import "./ShelterManagement.scss";
import "../../../BaseStyles.scss";


export const ShelterManagement = observer((props) => {
  const rootStore = useContext(RootStoreContext);
  const { authStore, petListingsStore } = rootStore;
  const { petList, petCount, nextPage } = petListingsStore;
  const { context } = authStore;
  const { currentUser } = context;

  useEffect(() => {
    if (currentUser) {
      const userId = currentUser.id;
      petListingsStore.initializeShelterManagementPage(userId);
    }
  }, [currentUser]);


  function renderListings() {
    if (petCount == 0) {
      return (
        <div className="ShelterManagement__pagination">
          <h1 className="BoldPurpleText">
            You currently have no pet listings.
          </h1>
        </div>
      );
    }
    return petList.map((pet) => <ShelterListing key={pet.id} petInfo={pet} />);
  }

  function getNextPage() {
    petListingsStore.getPetListingsNextPage();
  }

  return (
    <div class="PageContainer">
      <div class="Main">
        <h1 class="HeaderText">Manage your listings</h1>
        <div class="ShelterManagement">
          <div class="ShelterManagement__results">
            {renderListings()}

            <div
              class="ShelterManagement__addListing"
              onclick="location.href='../PetCreate/petcreate.html';"
            >
              <img src={AddSvg} alt=""></img>
              <h1 class="BoldPurpleText">Add Listing</h1>
            </div>
            {nextPage && (
              <div
                className="ShelterManagement__pagination"
                onClick={() => getNextPage()}
              >
                <h1 className="BoldPurpleText">Load More</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default ShelterManagement;
