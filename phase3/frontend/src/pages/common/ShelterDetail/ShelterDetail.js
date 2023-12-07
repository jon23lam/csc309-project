import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react";
import { RootStoreContext } from "../../../providers/RootProvider";
import { useParams } from "react-router-dom";
import "./ShelterDetail.scss";
export const ShelterDetail = observer((props) => {
  const rootStore = useContext(RootStoreContext);
  const { seekerShelterStore } = rootStore;
  const { user } = seekerShelterStore;
  const id = useParams();

  useEffect(() => {
    seekerShelterStore.retrieveShelterUser(id);
  }, []);

  return (
    <div className="PageContainer">
      <div className="center stack">
        <div className="slider-card center">
          <div>
            {user ? (
              <div className="PetDetail__image">
                {user.image && (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="PetDetail__image"
                  />
                )}
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
        <div className="center">
          <div className="info-card">
            <div>
              <h1>{user.shelter_name}</h1>
              <br />
              <div>
                {user && (
                  <div>
                    <a className="info-item" href="#">
                      {user.phone_number}
                    </a>
                    <a className="dot">•</a>
                    <a className="info-item" href={`mailto:${user.email}`}>
                      {user.email}
                    </a>
                    <a className="dot">•</a>
                    <a className="info-item" href="#">
                      {user.street_address}, {user.city}, {user.province}
                    </a>
                  </div>
                )}
              </div>
            </div>
            <hr />
            <div className="quick-info">
              <p className="info-item">
                Animals we have: {user.animals_offered}
              </p>
            </div>
            <hr />
            <div>
              <section id="services-facilities">
                <h2>Shelter Description</h2>
                <p>{user.description}</p>
              </section>
            </div>
          </div>
        </div>
        {/*<div className="center">*/}
        {/*  <div className="review-card">*/}
        {/*    <h1 className="center">Reviews</h1>*/}
        {/*    <br />*/}
        {/*    <div className="reviews">*/}
        {/*      <div className="review">*/}
        {/*        <h1>By Sarah T.</h1>*/}
        {/*        <p>*/}
        {/*          I adopted my sweet Luna from Forever Paws Pet Haven, and it*/}
        {/*          was an amazing experience. The staff were friendly and*/}
        {/*          helpful, and Luna is the perfect addition to our family.*/}
        {/*          Thanks, Forever Paws, for bringing us together!*/}
        {/*        </p>*/}
        {/*        <div className="rating">*/}
        {/*          <span className="star">&#9733;</span>*/}
        {/*          <span className="star">&#9733;</span>*/}
        {/*          <span className="star">&#9733;</span>*/}
        {/*          <span className="star">&#9733;</span>*/}
        {/*          <span className="star">&#9733;</span>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className="review">*/}
        {/*        <h1>By David L.</h1>*/}
        {/*        <p>*/}
        {/*          Forever Paws Pet Haven is a fantastic shelter. I volunteer*/}
        {/*          here regularly, and their commitment to animal care is*/}
        {/*          top-notch. Clean facilities, dedicated staff, and happy*/}
        {/*          animals. Highly recommended!.*/}
        {/*        </p>*/}
        {/*        <div className="rating">*/}
        {/*          <span className="star">&#9733;</span>*/}
        {/*          <span className="star">&#9733;</span>*/}
        {/*          <span className="star">&#9733;</span>*/}
        {/*          <span className="star">&#9733;</span>*/}
        {/*          <span className="star">&#9733;</span>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className="review">*/}
        {/*        <h1>By Emily R.</h1>*/}
        {/*        <p>*/}
        {/*          I adopted Whiskers and Mittens from Forever Paws Pet Haven,*/}
        {/*          and they've brought so much joy to my life. The shelter's*/}
        {/*          process was smooth, and it's clear they truly care about their*/}
        {/*          animals.*/}
        {/*        </p>*/}
        {/*        <div className="rating">*/}
        {/*          <span className="star">&#9733;</span>*/}
        {/*          <span className="star">&#9733;</span>*/}
        {/*          <span className="star">&#9733;</span>*/}
        {/*          <span className="star">&#9733;</span>*/}
        {/*          <span className="star">&#9733;</span>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </div>
  );
});
