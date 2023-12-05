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
    petListingsStore.getPetListingsFiltered(filters);

    window.addEventListener('resize', handleResize);
    setMobileMode(handleResize);
  }, [filters]);

  function handleResize() {
    const mobileMode = window.innerWidth < 480;

    setMobileMode(mobileMode)
  }

  function onFiltersChange(filterType, filterValue) {
    setFilters(prevFilters => {
      let newFilters = { ...prevFilters.filters };
  
      newFilters[filterType] = filterValue;
  
      return { filters: newFilters };
    });
  }


  function onSortby(sort) {
    setFilters(prevFilters => {
      let newFilters = { ...prevFilters }
  
      newFilters["sort_by"] = {};
      newFilters["sort_by"][sort] = sortOrder;

      setSortType(sort);
      
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
          <select name="sex" id="sex" className="Dropdown__PurpleOutline">
            <option value="" disabled defaultValue hidden>
              Select a sex
            </option>
            <option value="any">Any</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="Filters__filterItem">
          <label htmlFor="province">Province:</label>
          <select
            name="province"
            id="province"
            className="Dropdown__PurpleOutline"
          >
            <option value="" disabled defaultValue hidden>
              Select a Province
            </option>
            <option value="ontario">Ontario</option>
            <option value="british-columbia">British Columbia</option>
            <option value="alberta">Alberta</option>
            <option value="manitoba">Manitoba</option>
            <option value="new-brunswick">New Brunswick</option>
            <option value="newfoundland-and-labrador">
              Newfoundland and Labrador
            </option>
            <option value="nova-scotia">Nova Scotia</option>
            <option value="prince-edward-island">Prince Edward Island</option>
            <option value="quebec">Quebec</option>
            <option value="saskatchewan">Saskatchewan</option>
            <option value="northwest-territories">Northwest Territories</option>
            <option value="nunavut">Nunavut</option>
            <option value="yukon">Yukon</option>
          </select>
        </div>
        <div className="Filters__filterItem">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            className="TextField__PurpleOutline"
          />
        </div>
        <div className="Filters__filterItem">
          <label htmlFor="color">Color:</label>
          <select name="color" id="color" className="Dropdown__PurpleOutline">
            <option value="" disabled defaultValue hidden>
              Select a color
            </option>
            <option value="any">Any</option>
            <option value="white">White</option>
            <option value="black">Black</option>
            <option value="Brown">Brown</option>
            <option value="sable">Sable</option>
          </select>
        </div>
        <div className="Filters__filterItem">
          <label>Age:</label>
          <div className="Filters__range">
            <input
              type="number"
              id="age_from"
              name="age_from"
              placeholder="From"
              className="TextField__PurpleOutlineRange"
            />
            <input
              type="number"
              id="age_to"
              name="age_to"
              placeholder="To"
              className="TextField__PurpleOutlineRange"
            />
          </div>
        </div>
        <div className="Filters__filterItem">
          <label>Weight:</label>
          <div className="Filters__range">
            <input
              type="number"
              id="weight_from"
              name="weight_from"
              placeholder="From"
              className="TextField__PurpleOutlineRange"
            />
            <input
              type="number"
              id="weight_to"
              name="weight_to"
              placeholder="To"
              className="TextField__PurpleOutlineRange"
            />
          </div>
        </div>
        <div className="Filters__filterItem">
          <label htmlFor="description">Description:</label>
          <textarea
            type="text"
            id="description"
            name="description"
            className="TextField__PurpleOutline SearchPage__description"
            placeholder="Enter a description of the pet"
          ></textarea>
        </div>
      </div>
    </div>
  );
});
