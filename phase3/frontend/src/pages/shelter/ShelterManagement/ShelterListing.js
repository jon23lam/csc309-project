import React, { useEffect, useContext } from "react";
import { observer } from "mobx-react";

export const ShelterListing = observer((props) => {
  const { petInfo } = props;
  const { id, name, age, sex, weight, breed, description, image } = petInfo;

  return (
    <div className="ShelterManagement__petInfo" key={id}>
      <div className="ShelterManagement__petPhotoWrapper">
        <img src={image} alt="Pet Photo" className="ShelterManagement__petPhoto" />
      </div>
      <div className="ShelterManagement__petDescription">
        <h4>Name: {name}</h4>
        <h4>Age: {age}</h4>
        <h4>Sex: {sex}</h4>
        <h4>Breed: {breed}</h4>
        <h4>Weight: {weight}</h4>
        <h4>Description: {description}</h4>
        <button
          className="Button__purpleOutline"
          // onclick="location.href='../Applications/ApplicationsPage.html';"
        >
          See Applications
        </button>
        <button
          className="Button__purpleOutline"
          // onclick="location.href='../PetCreate/petedit.html';"
        >
          Edit Listing
        </button>
        <button className="Button__purple">Delete Listing</button>
      </div>
    </div>
  );
});

export default ShelterListing;
