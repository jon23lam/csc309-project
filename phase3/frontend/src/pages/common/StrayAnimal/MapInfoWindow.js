import React, { useContext } from "react";
import { RootStoreContext } from "../../../providers/RootProvider";

import "../../../BaseStyles.scss";
import "./MapInfoWindow.scss";

export const MapInfoWindow = (props) => {
  const rootStore = useContext(RootStoreContext);
  const { strayAnimalsStore } = rootStore;

  const { animal } = props;

  async function onStatusChange(status) {
    const payload = {
      status: status,
    };

    await strayAnimalsStore.updateStrayAnimal(animal.id, payload);
  }

  return (
    <div className="MapInfoWindow">
      <div className="MapInfoWindow__textSection">
        <h6 className="MapInfoWindow__text">
          <b>Last seen at:</b> {animal.address}
        </h6>
        <h6 className="MapInfoWindow__text">
          <b>Status:</b> {animal.status}
        </h6>
        <h6 className="MapInfoWindow__text">
          <b>Animal:</b> {animal.animal}
        </h6>
        <h6 className="MapInfoWindow__text">
          <b>Breed:</b> {animal.breed}
        </h6>
        <h6 className="MapInfoWindow__text">
          <b>Description:</b> {animal.description}
        </h6>
      </div>
      <div className="MapInfoWindow__buttonSection">
        <button
          className="Button__purpleOutline"
          onClick={() => onStatusChange("lost")}
        >
          Not there anymore
        </button>
        <button
          className="Button__purple"
          onClick={() => onStatusChange("rescued")}
        >
          Rescued successfully
        </button>
      </div>
    </div>
  );
};

export default MapInfoWindow;
