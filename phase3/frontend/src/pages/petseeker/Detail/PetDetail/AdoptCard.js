import React, { useState, useEffect } from "react";
import { getPetListing } from "../../../../requests/petListings";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./PetDetailPage.scss";
import "../../../../BaseStyles.scss";

const AdoptCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [petListing, setPetListing] = useState(null);

  useEffect(() => {
    const fetchPetListing = async () => {
      try {
        const response = await getPetListing(id);
        setPetListing(response.data);
      } catch (error) {
        console.error("Error fetching pet listing:", error);
      }
    };

    fetchPetListing();
  }, [id]);

  const handleAdoptClick = () => {
    if (petListing?.status === "available") {
      // Redirect to pet details page for available pets
      navigate(`/petdetail/${id}`);
    } else {
      // Redirect to application page for adopted pets
      navigate("/application");
    }
  };

  return (
    <div
      className={`adopt-card ${
        petListing?.status !== "available" ? "adopted" : ""
      }`}
    >
      <h1 className="center">
        {petListing?.status === "available"
          ? `Adopt ${petListing?.name} Now!`
          : `Sorry, ${petListing?.name} is already adopted`}
      </h1>
      {petListing?.status === "available" && (
        <p className="center">Click below if you would like to adopt now:</p>
      )}
      <div className="d-flex justify-content-center">
        {petListing?.status === "available" ? (
          <Link
            to={`/application/${id}/`}
            className="btn btn-primary adopt-button"
          >
            Adopt now!
          </Link>
        ) : (
          <Link to={`/search/`} className="btn btn-primary adopt-button ">
            View Other Pets
          </Link>
        )}
      </div>
    </div>
  );
};

export default AdoptCard;
