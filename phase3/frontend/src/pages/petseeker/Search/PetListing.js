import React, { useEffect, useContext } from "react";
import { observer } from "mobx-react";
import { RootStoreContext } from "../../../providers/RootProvider";

export const PetListing = observer((props) => {
  const { petInfo } = props;
  const { id, name, age, sex, weight, breed, description, image } = petInfo

  return (
    <div className="SearchPage__petInfo" key={id}>
      <div className="SearchPage__petPhotoWrapper">
        <img
          src={image}
          alt="Pet Photo"
          className="SearchPage__petPhoto"
        />
      </div>
      <div className="SearchPage__petDescription">
        <h4>Name: {name}</h4>
        <h4>Age: {age}</h4>
        <h4>Sex: {sex}</h4>
        <h4>Breed: {breed}</h4>
        <h4>Weight: {weight}</h4>
        <h4>
          Description: {description}
        </h4>
        <button
          className="Button__purpleOutline"
        >
          More Info
        </button>
        <button
          className="Button__purpleOutline"
        >
          See Shelter
        </button>
        <button
          className="Button__purple"
        >
          Apply
        </button>
      </div>
    </div>
  );
});

export default PetListing;
