import { action, makeObservable, observable } from "mobx";
import * as applicationService from "../requests/applicationRequests";
import app from "../App";

export class ApplicationStore {
  applicationList = [];
  appCount = 0;
  isLoading = false;
  nextPage = null;

  constructor() {
    makeObservable(this, {
      applicationList: observable,
      isLoading: observable,
      appCount: observable,
      nextPage: observable,
      setIsLoading: action,
      setAppCount: action,
      setApplicationList: action,
      setNextPage: action,
    });
  }

  setIsLoading = (isLoading) => {
    this.isLoading = isLoading;
  };

  setApplicationList = (applicationList) => {
    this.applicationList = applicationList;
  };

  setAppCount = (appCount) => {
    this.appCount = appCount;
  };

  setNextPage = (nextPage) => {
    this.nextPage = nextPage;
  };

  extendApplicationList = (applicationList) => {
    this.applicationList = [...this.applicationList, ...applicationList];
  };

  extendAppCount = (appCount) => {
    this.appCount = this.appCount + appCount;
  };

  initializeApplicationPage = async (userId) => {
    this.setIsLoading(true);

    try {
      const response = await applicationService.getApplications(); // FIX THIS

      const { count, results, next } = response.data;

      this.setAppCount(count);
      this.setApplicationList(results);
      if (next) {
        this.setNextPage(true);
      }
    } catch (err) {
      console.log("failed to get applications");
    }

    this.setIsLoading(false);
  };

  // initializeShelterManagementPage = async (listerId) => {
  //   this.setIsLoading(true);
  //
  //   try {
  //     const response = await petListingsService.getPetListings({
  //       filters: { lister: listerId },
  //     });
  //
  //     const { count, results, next } = response.data;
  //
  //     this.setPetCount(count);
  //     this.setPetList(results);
  //     if (next) {
  //       this.setNextPage(next);
  //     }
  //   } catch (err) {
  //     console.log("failed to get petlistings");
  //   }
  //
  //   this.setIsLoading(false);
  // };

  getApplicationsFilterd = async (filters) => {
    this.setIsLoading(true);

    try {
      const response = await applicationService.getApplications(filters); // FIX THIS

      const { count, results, next } = response.data;

      this.setAppCount(count);
      this.setApplicationList(results);
      if (next) {
        this.setNextPage(next);
      }
    } catch (err) {
      console.log("failed to get applications");
    }

    this.setIsLoading(false);
  };

  getApplicationsNextPage = async () => {
    this.setIsLoading(true);

    try {
      const response = await applicationService.getApplicationsNextPage(
        // FIX THIS
        this.nextPage,
      );

      const { count, results, next } = response.data;
      console.log(next);

      this.extendAppCount(count);
      this.extendApplicationList(results);
      if (next) {
        this.setNextPage(next);
      } else {
        this.setNextPage(null);
      }
    } catch (err) {
      console.log("failed to get applications");
    }

    this.setIsLoading(false);
  };

  updateApplication = async (applicationId, formData) => {
    try {
      const response = await applicationService.patchApplication(
        applicationId,
        formData,
      );
      console.log(response.data);
    } catch (error) {
      throw error;
    }
  };
}

export default ApplicationStore;
