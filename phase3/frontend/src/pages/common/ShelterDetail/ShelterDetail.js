import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { RootStoreContext } from "../../../providers/RootProvider";
import { formatErrors } from "../../../utils/formatErrors";
import { useParams } from "react-router-dom";
import "./ShelterDetail.scss";

export const ShelterDetail = observer((props) => {
  const rootStore = useContext(RootStoreContext);
  const { seekerShelterStore } = rootStore;
  const { user, shelterReviews, reviewCount } = seekerShelterStore;
  const id = useParams();

  const [rating, setRating] = useState(null);
  const [ratingComment, setRatingComment] = useState(null);
  const [errorText, setErrorText] = useState(null);

  useEffect(() => {
    seekerShelterStore.retrieveShelterUser(id.id);
    seekerShelterStore.getShelterReviews(id.id);
  }, []);

  function renderReviews() {
    if (reviewCount == 0) {
      return <div>There are no reviews for this shelter yet</div>
    }
    return shelterReviews.map((review) => (
      <div class="review">
        <p>
          "{review.content}"
        </p>
        <div class="rating">
          {Array.from({ length: review.rating }, (_, index) => (
            <span key={review.id + index} class="star">&#9733;</span>
          ))}
        </div>
      </div>
    ));
  }

  function onRatingclick(rating) {
    setRating(rating);
  }

  async function submitReview() {
    if (!rating || !ratingComment) {
      setErrorText("Plase select a rating and write something above.")
    } else {
      setErrorText(null)
      const payload = {
        content: ratingComment,
        rating: rating
      }
      await seekerShelterStore.createShelterReview(id.id, payload)
    }
  }


  return (
    <div className="PageContainer">
      <div className="center stack">
        <div className="slider-card center">
          <div>
            {user ? (
              <div className="PetDetail__image">
                {user.image && (
                  <img
                    src={`${process.env.REACT_APP_BACKEND_BASE_URL}${user.image}`}
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
        <div class="center">
          <div class="review-card">
            <h1 class="center">Reviews</h1>
            <br />
            <div class="reviews">{renderReviews()}</div>
          </div>
        </div>
        <div class="center">
          <div class="review-card">
            <h1 class="center">Leave a review for {user.shelter_name}</h1>
            <div class="rating-review">
              <span class={`star ${0 < rating ? 'pink-star' : ''}`} onClick={() => onRatingclick(1)}>&#9733;</span>
              <span class={`star ${1 < rating ? 'pink-star' : ''}`} onClick={() => onRatingclick(2)}>&#9733;</span>
              <span class={`star ${2 < rating ? 'pink-star' : ''}`} onClick={() => onRatingclick(3)}>&#9733;</span>
              <span class={`star ${3 < rating ? 'pink-star' : ''}`} onClick={() => onRatingclick(4)}>&#9733;</span>
              <span class={`star ${4 < rating ? 'pink-star' : ''}`} onClick={() => onRatingclick(5)}>&#9733;</span>
            </div>
            <textarea
              className="Review__textarea"
              name="message"
              placeholder="Leave your review here"
              rows="4"
              onChange={(e) => setRatingComment(e.target.value)}
            ></textarea>
            <div class="Review__submit">
              <button className="Button__purple" onClick={() => submitReview()}>Submit Review</button>
            </div>
            {errorText && (
            <div className="errorText">
              <h6 className="show-red-text">{errorText}</h6>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
