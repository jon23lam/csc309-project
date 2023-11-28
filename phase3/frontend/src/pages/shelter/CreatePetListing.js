import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RootStoreContext } from "../../providers/RootProvider";
import { postPetListing } from "../../requests/petListings";
import "../../BaseStyles.scss";
import "./petcreate.css";
import { SelectField } from "../../utils/components/SelectField";

const ANIMAL_OPTIONS = [
    {value: "dog", display: "Dog"},
    {value: "cat", display: "Cat"},
    {value: "bird", display: "Bird"},
    {value: "fish", display: "Fish"}
]

const BREED_OPTIONS = [
    {value: "corgi", display: "Corgi"},
    {value: "labrador", display: "Labrador"},
    {value: "retriever", display: "Retriever"},
    {value: "german shepherd", display: "German Shepherd"},
    {value: "pussycat", display: "Pussycat"},
]

const SEX_OPTIONS = [
    {value: "F", display: "Female"},
    {value: "M", display: "Male"}
]

const PROVINCE_OPTIONS = [
    {value: "ON", display: "Ontario"},
    {value: "BC", display: "British Columbia"},
    {value: "AB", display: "Alberta"},
    {value: "MB", display: "Manitoba"},
    {value: "NB", display: "New Brunswick"},
    {value: "NL", display: "Newfoundland and Labrador"},
    {value: "NS", display: "Nova Scotia"},
    {value: "PE", display: "Prince Edward Island"},
    {value: "QB", display: "Quebec"},
    {value: "SK", display: "Saskatchewan"},
    {value: "NT", display: "Northwest Territories"},
    {value: "NV", display: "Nunavut"},
    {value: "YK", display: "Yukon"}
]

const COLOR_OPTIONS = [
    {value: "white", display: "White"},
    {value: "black", display: "Black"},
    {value: "brown", display: "Brown"},
    {value: "sable", display: "Sable"}
]

const STATUS_OPTIONS = [
    {value: "available", display: "Available"},
    {value: "adopted", display: "Adopted"},
    {value: "pending", display: "Pending"},
    {value: "withdrawn", display: "Withdrawn"}
]

export function CreatePetListing(props) {
  const navigate = useNavigate();
  const rootStore = useContext(RootStoreContext);
  const { authStore } = rootStore;

  const [name, setName] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [sex, setSex] = useState("");
  const [province, setProvince] = useState("");
  const [address, setAddress] = useState("");
  const [color, setColor] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("");

  async function onClick() {
    const payload = {
        name: name,
        animal: animal,
        breed: breed,
        sex: sex,
        province: province,
        address: address,
        colour: color,
        age: age,
        weight: weight,
        description: description,
        status: status,
        image: image
    };
    console.log(payload)
    const creationResult = await postPetListing(payload);
    
    if (creationResult.status === 200) {
        // NAVIGATE SOMEWHERE
    }
    else {
        // If there are errors that only the backend can inform us about, handle here
    }
  }

  return (
    <div className="Main">
    <h1>List your pet!</h1>
    <div className="PetCreate__fields">
        <form className="Filters__form" method="post" encType="multipart/form-data">
            <div className="Filters__filterItem">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" placeholder="Name" className="TextField__PurpleOutline" onChange={(e) => setName(e.target.value)}/>
            </div>
            <SelectField label="Animal" options={ANIMAL_OPTIONS} stateCallback={setAnimal}/>
            <SelectField label="Breed" options={BREED_OPTIONS} stateCallback={setBreed}/>
            <SelectField label="Sex" options={SEX_OPTIONS} stateCallback={setSex}/>
            <SelectField label="Province" options={PROVINCE_OPTIONS} stateCallback={setProvince}/>
            <div className="Filters__filterItem">
                <label htmlFor="address">Address</label>
                <input type="text" id="address" name="address" className="TextField__PurpleOutline" onChange={(e) => setAddress(e.target.value)}/>
            </div>
            <SelectField label="Color" options={COLOR_OPTIONS} stateCallback={setColor}/>
            <div className="Filters__filterItem">
                <label htmlFor="age">Age:</label>
                <div className="Filters__range">
                    <input type="number" id="age" name="age" placeholder="Age" min="0" className="TextField__PurpleOutlineRange" onChange={(e) => setAge(e.target.value)}/>
                </div>
            </div>
            <div className="Filters__filterItem">
            <label htmlFor="weight">Weight:</label>
                <div className="Filters__range">
                    <input type="number" id="weight" name="weight" placeholder="Weight" min="0" className="TextField__PurpleOutlineRange" onChange={(e) => setWeight(e.target.value)}/>
                </div>
            </div>
            <div className="Filters__filterItem">
                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" className="TextField__PurpleOutline PetCreate__petDescription" onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
            <div className="Filters__filterItem">
                <label htmlFor="image">Image:</label>
                <input type="file" id="image" name="image" className="TextField__PurpleOutline" onChange={(e) => setImage(e.target.files[0])}/>
            </div>
            <SelectField label="Status" options={STATUS_OPTIONS} stateCallback={setStatus}/>
        </form>
        <div className="PetCreate__listButton">
            <button className="Button__purple" onClick={onClick}>List Animal</button>
        </div>
        </div>
    </div>
  );
}

export default CreatePetListing;
