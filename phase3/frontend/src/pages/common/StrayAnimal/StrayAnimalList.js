import React, { useContext } from "react";
import { observer } from "mobx-react";
import { RootStoreContext } from "../../../providers/RootProvider";

import "../../../BaseStyles.scss";
import "./StrayAnimalList.scss";

export const StrayAnimalList = observer((props) => {
  const rootStore = useContext(RootStoreContext);
  const { strayAnimalsStore } = rootStore;
  const { animals, onClick } = props;

  async function onStatusChange(id, status) {
    const payload = {
      status: status,
    };

    await strayAnimalsStore.updateStrayAnimal(id, payload);
  }

  function renderAnimalList() {
    return animals.map((animal) => (
      <div
        className="StrayAnimalList__item"
        onClick={() => onClick(animal.id)}
        key={animal.id}
      >
        <div className="StrayAnimalList__textSection">
          <h6 className="StrayAnimalList__text">
            <b>Last seen at:</b> {animal.address}
          </h6>
          <h6 className="StrayAnimalList__text">
            <b>Status:</b> {animal.status}
          </h6>
          <h6 className="StrayAnimalList__text">
            <b>Animal:</b> {animal.animal}
          </h6>
          <h6 className="StrayAnimalList__text">
            <b>Breed:</b> {animal.breed}
          </h6>
          <h6 className="StrayAnimalList__text">
            <b>Description:</b> {animal.description}
          </h6>
        </div>
        <div className="StrayAnimalList__buttonSection">
          <button
            className="Button__purpleOutline"
            onClick={() => onStatusChange(animal.id, "lost")}
          >
            Not there anymore
          </button>
          <button
            className="Button__purple"
            onClick={() => onStatusChange(animal.id, "rescued")}
          >
            Rescued successfully
          </button>
        </div>
      </div>
    ));
  }

  return <div className="StrayAnimalList">{renderAnimalList()}</div>;
});

export default StrayAnimalList;
