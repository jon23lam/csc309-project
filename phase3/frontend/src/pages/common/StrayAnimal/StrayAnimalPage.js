import React, { useEffect, useContext, useState } from "react";
import {
  GoogleMap,
  Marker,
  MarkerClusterer,
  InfoWindowF,
  useJsApiLoader,
} from "@react-google-maps/api";
import { observer } from "mobx-react";
import { RootStoreContext } from "../../../providers/RootProvider";
import { ROLE_SEEKER, ROLE_SHELTER } from "../../../stores/AuthStore";
import { MapInfoWindow } from "./MapInfoWindow";
import { StrayAnimalList } from "./StrayAnimalList";
import { StrayAnimalForm } from "./StrayAnimalForm";
import MapStyles from "../../../MapStyles";
import { default as MapPinLost } from "../../../assets/svgs/map_icon1.svg";
import { default as MapPinRescued } from "../../../assets/svgs/map_icon2.svg";
import { default as MapPinSpotted } from "../../../assets/svgs/map_icon3.svg";
import { default as MapPinNew } from "../../../assets/svgs/map_icon4.svg";

import "./StrayAnimalPage.scss";
import "../../../BaseStyles.scss";

const containerStyle = {
  height: "calc(100% + 40px)",
  width: "100%",
  position: "absolute",
};

const mapOptions = {
  styles: MapStyles,
};

// If the user does not have geolocation on, it will default to Toronto
const defaultCenter = {
  lat: 43.6532,
  lng: -79.3832,
};

const INITIAL_ZOOM = 14;

export const StrayAnimalPage = observer((props) => {
  const rootStore = useContext(RootStoreContext);
  const { authStore, strayAnimalsStore, location, locationLoading } = rootStore;
  const { locationOn, latitude, longitude } = location;
  const { context } = authStore;
  const { currentUser } = context;
  const { strayAnimals } = strayAnimalsStore;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_TOKEN,
  });

  const [map, setMap] = React.useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const [role, setRole] = useState(null);
  const [locationSelected, setLocationSelected] = useState(false);
  const [selectedLat, setSelectedLat] = useState(null);
  const [selectedLng, setSelectedLng] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [center, setCenter] = useState(null);

  useEffect(() => {
    async function fetchStrayAnimals(params) {
      await strayAnimalsStore.initializePage(params);
    }
    if (currentUser) {
      const { role } = currentUser;
      if (role == ROLE_SEEKER) {
        // Seeker should be able to report pets so we load that in here
        setRole(ROLE_SEEKER);
        fetchStrayAnimals({ reporter: currentUser.id });
      } else if (role == ROLE_SHELTER) {
        // Shelters should be able to see reported stray animals
        setRole(ROLE_SHELTER);

        // If the user has a lat lng in them then only get stray animals in 5 km radius
        // Otherwise we get all of the stray animals
        let params = {};
        if (currentUser.lat && currentUser.lng) {
          params = { lat: currentUser.lat, lng: currentUser.lng, radius: 5 };
        }

        fetchStrayAnimals(params);
      }

      
    }
  }, [currentUser]);

  useEffect(() => {
    if (locationOn && latitude && longitude) {
      setCenter({ lat: latitude, lng: longitude });
    } else {
      setCenter(defaultCenter)
    }
  }, [location])

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    map.setZoom(INITIAL_ZOOM);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  function handleActiveMarker(marker) {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  }

  async function handleMapClick(event) {
    if (role == ROLE_SEEKER) {
      setSelectedLat(event.latLng.lat());
      setSelectedLng(event.latLng.lng());

      const latlng = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };

      const google = window.google;
      const geocoder = new google.maps.Geocoder();
      const response = await geocoder.geocode({ location: latlng });
      if (response.results[0]) {
        const address = response.results[0].formatted_address;
        setSelectedAddress(address);
        setLocationSelected(true);
      }
    } else if (role == ROLE_SHELTER) {
      setActiveMarker(null);
    }
  }

  function handleMapPin(status) {
    if (status == "spotted") {
      return MapPinSpotted;
    } else if (status == "rescued") {
      return MapPinRescued;
    } else {
      return MapPinLost;
    }
  }

  function renderMarkers(clusterer) {
    return strayAnimals.map((animal) => (
      <Marker
        key={animal.id}
        position={{ lat: animal.lat, lng: animal.lng }}
        clusterer={clusterer}
        onClick={() => handleActiveMarker(animal.id)}
        icon={{
          url: handleMapPin(animal.status),
        }}
      >
        {activeMarker === animal.id ? (
          <InfoWindowF
            position={{ lat: animal.lat, lng: animal.lng }}
            onCloseClick={() => setActiveMarker(null)}
          >
            <MapInfoWindow animal={animal} />
          </InfoWindowF>
        ) : null}
      </Marker>
    ));
  }

  function renderReport() {
    if (role === ROLE_SEEKER) {
      return (
        <StrayAnimalForm
          locationSelected={locationSelected}
          lat={selectedLat}
          lng={selectedLng}
          selectedAddress={selectedAddress}
          onCancel={() => setLocationSelected(false)}
        />
      );
    } else if (role === ROLE_SHELTER) {
      return (
        <StrayAnimalList animals={strayAnimals} onClick={handleActiveMarker} />
      );
    } else {
      return <div>Failed to load report section</div>;
    }
  }

  return (
    <div className="StrayAnimalPage">
      <div className="StrayAnimalPage__report">
        {!role ? (
          <div>Loading</div>
        ) : (
          <>
            <div className="StrayAnimalPage__reportKey">
              <h6>Spotted:</h6> <img src={MapPinSpotted} alt=""></img>
              <h6>Lost:</h6> <img src={MapPinLost} alt=""></img>
              <h6>Rescued:</h6>
              <img src={MapPinRescued} alt=""></img>
            </div>
            {renderReport()}
            <h6 className="credit-text">
              Icons from FlatIcon:
              https://www.flaticon.com/free-icon/location_2934709?related_id=2935090&origin=search
            </h6>
          </>
        )}
      </div>
      <div className="StrayAnimalPage__map">
        <div className="StrayAnimalPage__mapWrapper"></div>
        {isLoaded && !locationLoading ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            onClick={(e) => handleMapClick(e)}
            center={center}
            zoom={INITIAL_ZOOM}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={mapOptions}
          >
            <MarkerClusterer
              averageCenter
              enableRetinaIcons
              zoomOnClick
              gridSize={60}
              maxZoom={18}
            >
              {(clusterer) => <div>{renderMarkers(clusterer)}</div>}
            </MarkerClusterer>
            {locationSelected && (
              <Marker
                key={selectedLat + selectedLng}
                position={{ lat: selectedLat, lng: selectedLng }}
                icon={{
                  url: MapPinNew,
                }}
              />
            )}
          </GoogleMap>
        ) : (
          <div>Loading Map...</div>
        )}
      </div>
    </div>
  );
});

export default StrayAnimalPage;
