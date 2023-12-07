import React, { useEffect, useContext, useState } from "react";
import { RootStoreContext } from "../../../providers/RootProvider";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { deletePetListing } from "../../../requests/petListings";

export const ShelterListing = observer((props) => {
  const navigate = useNavigate();
  const rootStore = useContext(RootStoreContext);
  const { petListingsStore } = rootStore;
  const { petInfo } = props;
  const { id, name, age, sex, weight, breed, description, image } = petInfo;

  const [errorText, setErrortext] = useState(null)

  function onEditClick() {
    navigate(`/editlisting/${id}`)
  }

  async function onDeleteClick() { 
    const petListed = await petListingsStore.deletePetListing(id)
    if (petListed) {
      setErrortext(null)
    } else {
      setErrortext("Failed to delete pet listing.")
    }
  }

  return (
    <div className="ShelterManagement__petInfo" key={id}>
      <div className="ShelterManagement__petPhotoWrapper">
        <img src={image} alt="Pet Photo" className="ShelterManagement__petPhoto" />
      </div>
      <div className="ShelterManagement__petDescription">
        <h4><b>Name:</b> {name}</h4>
        <h4><b>Age:</b> {age}</h4>
        <h4><b>Sex:</b> {sex}</h4>
        <h4><b>Breed:</b> {breed}</h4>
        <h4><b>Weight:</b> {weight}</h4>
        <h4 className="description-field"><b>Description:</b> {description}</h4>
        <button
          className="Button__purpleOutline"
          // onclick="location.href='../Applications/ApplicationsPage.html';"
        >
          See Applications
        </button>
        <button
          className="Button__purpleOutline"
          onClick={() => onEditClick()}
        >
          Edit Listing
        </button>
        <button className="Button__purple" onClick={() => onDeleteClick()}>Delete Listing</button>
        {errorText && (
            <div className="errorText">
              <h6 className="show-red-text">{errorText}</h6>
            </div>
          )}
      </div>
    </div>
  );
});

export default ShelterListing;
