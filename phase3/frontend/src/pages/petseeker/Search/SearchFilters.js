import React, { useEffect, useContext, useState } from "react";
import { observer } from "mobx-react";
import { RootStoreContext } from "../../../providers/RootProvider";

export const SearchFilters = observer((props) => {
  const rootStore = useContext(RootStoreContext);
  const { petListingsStore } = rootStore;

  const [filters, setFilters] = useState({ filters: {"status": "any"} });
  const [sortType, setSortType] = useState("created_at")
  const [sortOrder, setSortOrder] = useState("asc");
  const [mobileMode, setMobileMode] = useState(false);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    setMobileMode(handleResize);
  }, []);

  function handleResize() {
    const mobileMode = window.innerWidth < 480;

    setMobileMode(mobileMode)
  }

  function onFiltersChange(filterType, filterValue) {
    setFilters(prevFilters => {
      let newFilters = { ...prevFilters.filters };
  
      newFilters[filterType] = filterValue;
      
      petListingsStore.getPetListingsFiltered({filters: newFilters});
      return { filters: newFilters };
    });
  }


  function onSortby(sort) {
    setFilters(prevFilters => {
      let newFilters = { ...prevFilters }
  
      newFilters["sort_by"] = {};
      newFilters["sort_by"][sort] = sortOrder;

      setSortType(sort);
      
      petListingsStore.getPetListingsFiltered(newFilters);
      return newFilters
    })
  }

  function toggleSortOrder() {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
  
    setFilters(prevFilters => {
      let newFilters = { ...prevFilters };
  
      // Ensure the new sort order is used
      newFilters["sort_by"] = {};
      newFilters["sort_by"][sortType] = newSortOrder;
  
      // If sortType is also state-dependent and changes, ensure it's handled correctly
      setSortType(sortType);
      
      petListingsStore.getPetListingsFiltered(newFilters);
      return newFilters;
    });
  }

  return (
    <div className="SearchPage__filters">
      <div className="Filters__form">
        <div className="Filters__headerWrapper">
          <h2 className="Filters__header">Search Filters</h2>
          {mobileMode && (<div className="Filters__back" onClick={() => props.toggle(false)}>
            Back
          </div>)}
        </div>
        <div className="Filters__filterItem">
          <label>Sort by:</label>
          <div className="Filters__sort">
            <button className="Button__purpleOutline" onClick={() => onSortby("name")}>Alphabetical</button>
            <button className="Button__purpleOutline" onClick={() => onSortby("age")}>Age</button>
            <button className="Button__purpleOutline" onClick={() => onSortby("created_at")}>Created</button>
            <div className="Filters__descending">
              <label className="descending-text">Descending:</label>
              <label className="Toggle">
                <input type="checkbox" onChange={toggleSortOrder} />
                <span className="ToggleSlider"></span>
              </label>
            </div>
          </div>
        </div>
        <div className="Filters__filterItem">
          <label htmlFor="animal">Animal:</label>
          <select name="animal" id="animal" className="Dropdown__PurpleOutline" onChange={(e) => onFiltersChange("animal", e.target.value)}>
            <option value="" disabled defaultValue hidden>
              Select an animal
            </option>
            <option value="any">All</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="bird">Bird</option>
            <option value="fish">Fish</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="Filters__filterItem">
          <label htmlFor="breed">Breed:</label>
          <select
            name="breed"
            id="breed"
            onChange={(e) => onFiltersChange("breed", e.target.value)}
            className="Dropdown__PurpleOutline"
          >
            <option value="" disabled defaultValue hidden>
              Select a breed
            </option>
            <option value="any">Any</option>
            <option value="corgi">Corgi</option>
            <option value="labrador">Labrador</option>
            <option value="retriever">Retriever</option>
            <option value="german shepherd">German Shepherd</option>
            <option value="pussycat">Pussycat</option>
            <option value="persian">Persian</option>
            <option value="shorthair">Shorthair</option>
            <option value="sphynx">Sphynx</option>
            <option value="parakeet">Parakeet</option>
            <option value="chicken">Chicken</option>
            <option value="bass">Bass</option>
            <option value="goldfish">Goldfish</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="Filters__filterItem">
          <label htmlFor="breed">Status:</label>
          <select
            name="breed"
            id="breed"
            onChange={(e) => onFiltersChange("status", e.target.value)}
            className="Dropdown__PurpleOutline"
          >
            <option value="" disabled defaultValue hidden>
              Select a status
            </option>
            <option value="any">Any</option>
            <option value="available">Available</option>
            <option value="adopted">Adopted</option>
            <option value="pending">Pending</option>
            <option value="withdrawn">Withdrawn</option>
          </select>
        </div>
        <div className="Filters__filterItem">
          <label htmlFor="sex">Sex:</label>
          <select name="sex" id="sex" className="Dropdown__PurpleOutline" onChange={(e) => onFiltersChange("sex", e.target.value)}>
            <option value="" disabled defaultValue hidden>
              Select a sex
            </option>
            <option value="any">Any</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>
        <div className="Filters__filterItem">
          <label htmlFor="province">Province:</label>
          <select
            name="province"
            id="province"
            className="Dropdown__PurpleOutline"
            onChange={(e) => onFiltersChange("province", e.target.value)}
          >
            <option value="" disabled defaultValue hidden>
              Select a Province
            </option>
            <option value="any">Any</option>
            <option value="ON">Ontario</option>
            <option value="BC">British Columbia</option>
            <option value="AB">Alberta</option>
            <option value="MB">Manitoba</option>
            <option value="NB">New Brunswick</option>
            <option value="NL">
              Newfoundland and Labrador
            </option>
            <option value="NS">Nova Scotia</option>
            <option value="PE">Prince Edward Island</option>
            <option value="QB">Quebec</option>
            <option value="SK">Saskatchewan</option>
            <option value="NT">Northwest Territories</option>
            <option value="NV">Nunavut</option>
            <option value="YK">Yukon</option>
          </select>
        </div>
        <div className="Filters__filterItem">
          <label htmlFor="color">Color:</label>
          <select name="color" id="color" className="Dropdown__PurpleOutline" onChange={(e) => onFiltersChange("colour", e.target.value)}>
            <option value="" disabled defaultValue hidden>
              Select a color
            </option>
            <option value="any">Any</option>
            <option value="white">White</option>
            <option value="black">Black</option>
            <option value="brown">Brown</option>
            <option value="sable">Sable</option>
          </select>
        </div>
      </div>
    </div>
  );
});
