import React, { useEffect, useContext, useState } from "react";
import { observer } from "mobx-react";
import { RootStoreContext } from "../../../providers/RootProvider";
import { PetListing } from "./PetListing";
import { SearchFilters } from "./SearchFilters";

import "./SearchPage.scss";
import "../../../BaseStyles.scss";

export const SearchPage = observer((props) => {
  const rootStore = useContext(RootStoreContext);
  const { petListingsStore } = rootStore;
  const { petList, petCount, nextPage } = petListingsStore;

  const [showFilters, setShowFilters] = useState(true);
  const [mobileMode, setMobileMode] = useState(false);

  useEffect(() => {
    petListingsStore.initializeSearchPage();

    window.addEventListener('resize', handleResize);
    setMobileMode(window.innerWidth < 480)
    setShowFilters(window.innerWidth >= 480);

  }, []);

  function handleResize() {
    const mobileMode = window.innerWidth < 480;

    setMobileMode(mobileMode) 
  }

  function toggleFilters(value) {
    setShowFilters(value)
  }


  function renderPets() {
    if (petCount == 0) {
      return (
        <div className="SearchPage__pagination">
          <h1 className="BoldPurpleText">There are no listings that fit your search criteria</h1>
        </div>
      );
    }
    return petList.map((pet) => <PetListing key={pet.id} petInfo={pet} />);
  }

  function getNextPage() {
    petListingsStore.getPetListingsNextPage();
  }

  return (
    <div className="PageContainer">
      <div className="Main">
        <h1 className="HeaderText">Search for your new pet</h1>
        <div className="SearchPage">
          <div className="SearchPage__results">
            <div className="SearchPage__FilterButtonWrapper">
              {!showFilters && mobileMode && (<button
                id="FilterToggle"
                className="Button__purple"
                onClick={() => toggleFilters(true)}
              >
                Search Filters
              </button>)}
            </div>
            {(!mobileMode || (!showFilters && mobileMode)) && renderPets()}
            {(!mobileMode || (!showFilters && mobileMode)) && nextPage && (
              <div
                className="SearchPage__pagination"
                onClick={() => getNextPage()}
              >
                <h1 className="BoldPurpleText">Load More</h1>
              </div>
            )}
          </div>
          {(showFilters || !mobileMode) && <SearchFilters toggle={toggleFilters}/>}
        </div>
      </div>
    </div>
  );
});

export default SearchPage;
