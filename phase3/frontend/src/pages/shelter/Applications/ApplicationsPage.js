import React, { useEffect, useContext, useState } from "react";
import { observer } from "mobx-react";

import { Application } from "./Application";

import "./ApplicationsPage.scss";
import "../../../BaseStyles.scss";
import { RootStoreContext } from "../../../providers/RootProvider";

export const ApplicationsPage = observer((props) => {
  const rootStore = useContext(RootStoreContext);
  const { applicationStore } = rootStore;
  const { seekerShelterStore } = rootStore;
  const { applicationList, appCount, nextPage } = applicationStore;

  // const [showFilters, setShowFilters] = useState(true);
  // const [mobileMode, setMobileMode] = useState(false);

  useEffect(() => {
    applicationStore.initializeApplicationPage();

    // window.addEventListener("resize", handleResize);
    // setMobileMode(window.innerWidth < 480);
    // setShowFilters(window.innerWidth >= 480);
  }, []);

  // function handleResize() {
  //   const mobileMode = window.innerWidth < 480;
  //
  //   setMobileMode(mobileMode);
  // }

  // function toggleFilters(value) {
  //   // setShowFilters(value);
  // }

  function renderApplications() {
    if (appCount === 0) {
      return (
        <div className="ApplicationsPage__pagination">
          <h1 className="BoldPurpleText">
            There are no applications that fit your search criteria
          </h1>
        </div>
      );
    }
    return applicationList.map((application) => (
      <Application key={application.id} applicationInfo={application} />
    ));
  }

  function getNextPage() {
    applicationStore.getApplicationsNextPage();
  }

  return (
    <div className="PageContainer">
      <div className="Main">
        <h1 className="HeaderText">Applications</h1>
        <div className="ApplicationsPage">
          <div className="ApplicationsPage__results">
            <div className="ApplicationsPage__FilterButtonWrapper">
              {/*<h1>Applications Page</h1>*/}
            </div>
            {renderApplications()}
            <div
              className="SearchPage__pagination"
              onClick={() => getNextPage()}
            >
              <h1 className="BoldPurpleText">Load More</h1>
              {/*{(showFilters || !mobileMode) && (*/}
              {/*  <SearchFilters toggle={toggleFilters} />*/}
              {/*)}*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
