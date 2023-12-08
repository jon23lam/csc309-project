import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RootStoreContext } from "../../providers/RootProvider";
import {
  postPetListing,
  patchPetListing,
  getPetListing,
} from "../../requests/petListings";
import "../../BaseStyles.scss";
import "./PetListingEditor.scss";
import { SelectField } from "../../utils/components/SelectField";
import { formatErrors } from "../../utils/formatErrors";

const ANIMAL_OPTIONS = [
  { value: "dog", display: "Dog" },
  { value: "cat", display: "Cat" },
  { value: "bird", display: "Bird" },
  { value: "fish", display: "Fish" },
  { value: "other", display: "Other" },
];

const BREED_OPTIONS = [
  { value: "corgi", display: "Corgi" },
  { value: "labrador", display: "Labrador" },
  { value: "retriever", display: "Retriever" },
  { value: "german shepherd", display: "German Shepherd" },
  { value: "pussycat", display: "Pussycat" },
  { value: "persian", display: "Persian" },
  { value: "shorthair", display: "Shorthair" },
  { value: "sphynx", display: "Sphynx" },
  { value: "parakeet", display: "Parakeet" },
  { value: "chicken", display: "Chicken" },
  { value: "bass", display: "Bass" },
  { value: "goldfish", display: "Goldfish" },
  { value: "other", display: "Other" },
];

const SEX_OPTIONS = [
  { value: "F", display: "Female" },
  { value: "M", display: "Male" },
];

const COLOR_OPTIONS = [
  { value: "white", display: "White" },
  { value: "black", display: "Black" },
  { value: "brown", display: "Brown" },
  { value: "sable", display: "Sable" },
];

const STATUS_OPTIONS = [
  { value: "available", display: "Available" },
  { value: "adopted", display: "Adopted" },
  { value: "pending", display: "Pending" },
  { value: "withdrawn", display: "Withdrawn" },
];

export function PetListingEditor(props) {
  const navigate = useNavigate();
  const rootStore = useContext(RootStoreContext);
  const { petListingsStore } = rootStore;

  const [errorText, setErrorText] = useState(null);

  const { id } = useParams();
  const is_edit_page = id ? true : false;
  const [name, setName] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [sex, setSex] = useState("");
  const [color, setColor] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    retrievePet();
  }, []);

  let retrieved_pet_ = false;
  const retrievePet = async () => {
    if (is_edit_page && !retrieved_pet_) {
      retrieved_pet_ = true;
      const pet_ = (await getPetListing(id)).data;
      setName(pet_.name);
      setAnimal(pet_.animal);
      setBreed(pet_.breed);
      setSex(pet_.sex);
      setColor(pet_.colour);
      setAge(pet_.age);
      setWeight(pet_.weight);
      setDescription(pet_.description);
      setStatus(pet_.status);
    }
  };

  async function onClick() {
    const payload = {
      name: name,
      animal: animal,
      breed: breed,
      sex: sex,
      colour: color,
      age: age,
      weight: weight,
      description: description,
      status: status,
      image: image ? image : undefined,
    };
    const result = is_edit_page
      ? await patchPetListing(id, payload)
      : await postPetListing(payload);

    if (result.status === 200) {
      // NAVIGATE SOMEWHERE
      setErrorText(null);
      navigate("/manage_shelter");
    } else {
      // If there are errors that only the backend can inform us about, handle here
      const errString = formatErrors(result.data);
      setErrorText(errString);
    }
  }

  return is_edit_page && !name ? (
    <></>
  ) : (
    <div className="Main">
      <h1>{is_edit_page ? "Edit Listing" : "List your pet!"}</h1>
      <div className="PetCreate__fields">
        <form
          className="PetListingEditor__form"
          method="post"
          encType="multipart/form-data"
        >
          <div className="PetListingEditor__item">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              className="TextField__PurpleOutline"
              onChange={(e) => setName(e.target.value)}
              value={is_edit_page ? name : null}
            />
          </div>
          <SelectField
            label="Animal"
            options={ANIMAL_OPTIONS}
            defaultValue={is_edit_page ? animal : null}
            stateCallback={setAnimal}
          />
          <SelectField
            label="Breed"
            options={BREED_OPTIONS}
            defaultValue={is_edit_page ? breed : null}
            stateCallback={setBreed}
          />
          <SelectField
            label="Sex"
            options={SEX_OPTIONS}
            defaultValue={is_edit_page ? sex : null}
            stateCallback={setSex}
          />
          <SelectField
            label="Color"
            options={COLOR_OPTIONS}
            defaultValue={is_edit_page ? color : null}
            stateCallback={setColor}
          />
          <div className="PetListingEditor__item">
            <label htmlFor="age">Age:</label>
            <div className="Filters__range">
              <input
                type="number"
                id="age"
                name="age"
                placeholder="Age"
                min="0"
                className="TextField__PurpleOutlineRange"
                onChange={(e) => setAge(e.target.value)}
                value={is_edit_page ? age : null}
              />
            </div>
          </div>
          <div className="PetListingEditor__item">
            <label htmlFor="weight">Weight:</label>
            <div className="Filters__range">
              <input
                type="number"
                id="weight"
                name="weight"
                placeholder="Weight"
                min="0"
                className="TextField__PurpleOutlineRange"
                onChange={(e) => setWeight(e.target.value)}
                value={is_edit_page ? weight : null}
              />
            </div>
          </div>
          <div className="PetListingEditor__item">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              className="TextField__PurpleOutline PetCreate__petDescription"
              onChange={(e) => setDescription(e.target.value)}
              value={is_edit_page ? description : null}
            ></textarea>
          </div>
          <div className="PetListingEditor__item">
            <label htmlFor="image">Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              className="TextField__PurpleOutline"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <SelectField
            label="Status"
            options={STATUS_OPTIONS}
            defaultValue={is_edit_page ? status : null}
            stateCallback={setStatus}
          />
        </form>
        <div className="PetCreate__listButton">
          <button className="Button__purple" onClick={onClick}>
            List Animal
          </button>
        </div>
        {errorText && (
          <div className="errorText">
            <h6 className="show-red-text">{errorText}</h6>
          </div>
        )}
      </div>
    </div>
  );
}

export default PetListingEditor;
