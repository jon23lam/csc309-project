import React, { useEffect, useContext, useState } from "react";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { RootStoreContext } from "../../../providers/RootProvider";
import { ShelterListing } from "./ShelterListing";
import AddSvg from "../../../assets/svgs/icon_plus.svg"

import "./ShelterManagement.scss";
import "../../../BaseStyles.scss";


export const ShelterManagement = observer((props) => {
  const navigate = useNavigate();
  const rootStore = useContext(RootStoreContext);
  const { authStore, petListingsStore } = rootStore;
  const { petList, petCount, nextPage  } = petListingsStore;
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

  function onAddListingClick() {
    navigate("/createlisting")
  }

  return (
    <div className="PageContainer">
      <div className="Main">
        <h1 className="HeaderText">Manage your listings</h1>
        <div className="ShelterManagement">

          <div className="ShelterManagement__results">
            {renderListings()}

            <div
              className="ShelterManagement__addListing"
              onClick={() => onAddListingClick()}
            >
              <img src={AddSvg} alt=""></img>
              <h1 className="BoldPurpleText">Add Listing</h1>
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
