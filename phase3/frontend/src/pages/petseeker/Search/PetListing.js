import React, { useEffect, useContext } from "react";
import { observer } from "mobx-react";
import { RootStoreContext } from "../../../providers/RootProvider";
import { Link } from "react-router-dom";

export const PetListing = observer((props) => {
  const { petInfo } = props;
  const { id, name, age, sex, weight, breed, description, image, lister } =
    petInfo;

  return (
    <div className="SearchPage__petInfo" key={id}>
      <div className="SearchPage__petPhotoWrapper">
        <img src={image} alt="Pet Photo" className="SearchPage__petPhoto" />
      </div>
      <div className="SearchPage__petDescription">
        <h4>Name: {name}</h4>
        <h4>Age: {age}</h4>
        <h4>Sex: {sex}</h4>
        <h4>Breed: {breed}</h4>
        <h4>Weight: {weight}</h4>
        <h4>Description: {description}</h4>
        <Link to={`/petdetail/${id}/`} className="Button__purpleOutline">
          More Info
        </Link>

        <Link
          to={`/shelterDetail/${lister}/`}
          className="Button__purpleOutline"
        >
          See Shelter
        </Link>
        {/*We have to deal with the case where you cant adopt it*/}
        <Link to={`/adoptionForm/${id}/`} className="Button__purple">
          Apply!
        </Link>
      </div>
    </div>
  );
});

export default PetListing;
