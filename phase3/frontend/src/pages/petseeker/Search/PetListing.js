import React, { useEffect, useContext } from "react";
import { observer } from "mobx-react";
import { RootStoreContext } from "../../../providers/RootProvider";
import { Link } from "react-router-dom";

export const PetListing = observer((props) => {
  const { petInfo } = props;
  const { id, name, age, sex, weight, breed, description, image } = petInfo;

  return (
    <div className="SearchPage__petInfo" key={id}>
      <div className="SearchPage__petPhotoWrapper">
        <img src={image} alt="Pet Photo" className="SearchPage__petPhoto" />
      </div>
      <div className="SearchPage__petDescription">
        <h4><b>Name:</b> {name}</h4>
        <h4><b>Age:</b> {age}</h4>
        <h4><b>Sex:</b> {sex}</h4>
        <h4><b>Breed:</b> {breed}</h4>
        <h4><b>Weight:</b> {weight}</h4>
        <h4 className="description-field"><b>Description:</b> {description}</h4>
        <Link to={`/petdetail/${id}/`} className="Button__purpleOutline">
          More Info
        </Link>
        <button className="Button__purpleOutline">See Shelter</button>

        {/*We have to deal with the case where you cant adopt it*/}
        <Link to={`/adoptionForm/${id}/`} className="Button__purple">
          Apply!
        </Link>
      </div>
    </div>
  );
});

export default PetListing;
