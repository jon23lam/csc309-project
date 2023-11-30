import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./PetDetailPage.scss";
import "../../../../BaseStyles.scss";
import { getPetListing } from "../../../../requests/petListings";
import AdoptCard from "./AdoptCard";

export function PetDetailPage(props) {
  const { id } = useParams();
  const [petListing, setPetListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPetListing = async () => {
      try {
        console.log(id);
        const response = await getPetListing(id);
        setPetListing(response.data);
      } catch (error) {
        console.error("Error fetching pet listing:", error);
      } finally {
        // Set loading to false regardless of success or failure
        setLoading(false);
      }
    };

    fetchPetListing();
  }, [id]);

  if (loading) {
    // Render a loading message or spinner while data is being fetched
    return <p></p>;
  }
  return (
    <div className="PageContainer">
      <div className="center">
        <div className="slider-card center">
          <div>
            {petListing ? (
              <div>
                <p>
                  {petListing.image && (
                    <img src={petListing.image} alt={petListing.name} />
                  )}
                </p>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
      <div className="center main-content">
        <div className="info-card">
          <div>
            <h1>
              {petListing.name} (Status: {petListing.status})
            </h1>
            <br />
            <a
              className="info-item"
              href="#"
              // style="font-size: 18px; color: black"
            >
              {petListing.breed}
            </a>
            <a
              className="info-item"
              href="#"
              // style="font-size: 18px; color: black; text-decoration: none"
            >
              •
            </a>
            <a
              className="info-item"
              href="#"
              // style="font-size: 18px; color: black"
            >
              {petListing.address}, {petListing.province}
            </a>

            <br />
            <br />
          </div>

          <div className="quick-info">
            <a
              className="info-item"
              href="#"
              // style="font-size: 18px; color: black; text-decoration: none"
            >
              Young
            </a>
            <a
              className="info-item"
              href="#"
              // style="font-size: 18px; color: black; text-decoration: none"
            >
              •
            </a>
            <a
              className="info-item"
              href="#"
              // style="font-size: 18px; color: black; text-decoration: none"
            >
              Male
            </a>
            <a
              className="info-item"
              href="#"
              // style="font-size: 18px; color: black; text-decoration: none"
            >
              •
            </a>
            <a
              className="info-item"
              href=""
              // style="text-decoration: none; font-size: 18px; color: black"
            >
              Small
            </a>
            <a
              className="info-item"
              href="#"
              // style="font-size: 18px; color: black; text-decoration: none"
            >
              •
            </a>
            <a
              className="info-item"
              href=""
              // style="text-decoration: none; font-size: 18px; color: black"
            >
              Tricolor (Brown, Black, & White)
            </a>
          </div>
          <hr />
          <div>
            <section id="about">
              <h2>About</h2>
              <ul>
                <li>
                  <p>Shelter name: </p>
                </li>
                <li>
                  <p>Breed: {petListing.breed}</p>
                </li>
                <li>
                  <p>Sex: {petListing.sex}</p>
                </li>
                <li>
                  <p>Colour: {petListing.colour}</p>
                </li>
                <li>
                  <p>Weight: {petListing.weight}</p>
                </li>
                <li>
                  <p>Status: Available</p>
                </li>
              </ul>
            </section>
          </div>
          <div>
            <hr />
          </div>
          <div className="get-to-know">
            <h2>Get to know {petListing.name}</h2>
            <p>{petListing.description}</p>
          </div>
        </div>
        <AdoptCard />
      </div>
    </div>
  );
}
