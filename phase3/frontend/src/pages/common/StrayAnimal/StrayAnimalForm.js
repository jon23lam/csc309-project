import React, { useEffect, useContext, useState } from "react";
import { observer } from "mobx-react";
import { RootStoreContext } from "../../../providers/RootProvider";

import "../../../BaseStyles.scss";
import "./StrayAnimalForm.scss";

export const StrayAnimalForm = observer((props) => {
  const rootStore = useContext(RootStoreContext);
  const { authStore, strayAnimalsStore } = rootStore;
  const { context } = authStore;
  const { locationSelected, lat, lng, selectedAddress, onCancel } = props;

  const [animal, setAnimal] = useState(null);
  const [breed, setBreed] = useState(null);
  const [address, setAddress] = useState(null);
  const [description, setDescription] = useState(null);
  const [showAddressText, setShowAddressText] = useState(false);
  const [errorText, setErrorText] = useState(null);

  useEffect(() => {
    setAddress(selectedAddress);
  }, [selectedAddress]);

  async function onSubmit() {
    if (!animal || !breed || !address || !description) {
      setErrorText("Please fill in all fields");
    } else {
      setErrorText(null);

      const payload = {
        animal: animal,
        breed: breed,
        address: address,
        description: description,
        lat: lat,
        lng: lng,
        status: "spotted",
      };

      await strayAnimalsStore.createStrayAnimal(payload);
    }
  }

  return (
    <div className="StrayAnimalForm">
      {locationSelected ? (
        <div className="StrayAnimalForm__form">
          <div className="Filters__headerWrapper">
            <h2 className="Filters__header">Report a Stray Animal:</h2>
          </div>
          <div className="StrayAnimalForm__formItem">
            <label htmlFor="animal">Animal:</label>
            <select
              name="animal"
              id="animal"
              className="Dropdown__PurpleOutline"
              onChange={(e) => setAnimal(e.target.value)}
            >
              <option value="" defaultValue hidden>
                Select an animal
              </option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="bird">Bird</option>
              <option value="fish">Fish</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
          <div className="StrayAnimalForm__formItem">
            <label htmlFor="breed">Breed:</label>
            <select
              name="breed"
              id="breed"
              onChange={(e) => setBreed(e.target.value)}
              className="Dropdown__PurpleOutline"
            >
              <option value="" defaultValue hidden>
                Select a breed
              </option>
              <option value="corgi">Corgi</option>
              <option value="labrador">Labrador</option>
              <option value="retriever">Retriever</option>
              <option value="german shepherd">German Shepherd</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
          <div className="StrayAnimalForm__formItem">
            <label htmlFor="address">Address: </label>
            <input
              type="text"
              id="address"
              name="address"
              onFocus={() => setShowAddressText(true)}
              readOnly
              className="TextField__PurpleOutline"
              defaultValue={address}
            />
            {showAddressText && (
              <h6 className="show-red-text">
                Click on map to select new address
              </h6>
            )}
          </div>
          <div className="StrayAnimalForm__formItem">
            <label htmlFor="description">Description:</label>
            <textarea
              type="text"
              id="description"
              name="description"
              className="TextField__PurpleOutline SearchPage__description"
              placeholder="Enter a description of the animal"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="StrayAnimalForm__buttonWrapper">
            <button
              className="Button__purpleOutline"
              onClick={() => onCancel()}
            >
              Cancel
            </button>
            <button className="Button__purple" onClick={() => onSubmit()}>
              Submit
            </button>
          </div>
          {errorText && (
            <div className="StrayAnimalForm__errorText">
              <h6 className="show-red-text">{errorText}</h6>
            </div>
          )}
        </div>
      ) : (
        <div className="StrayAnimalForm__unselected">
          Click on the map to report an animal at that location.
        </div>
      )}
    </div>
  );
});

export default StrayAnimalForm;
