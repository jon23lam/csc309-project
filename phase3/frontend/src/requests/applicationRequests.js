import * as axiosRequests from "./axiosRequests";
import { endpoint } from "../utils/endpoint";

const GET_APPLICATIONS_LISTING_ENDPOINT = (listingId) =>
  endpoint(`api/applications/application/list/${listingId}/`);

const GET_APPLICATIONS_ENDPOINT = endpoint(
  "api/applications/application/list/",
);

const GET_APPLICATIONS_STATUS_ENDPOINT = (status) =>
  endpoint(`api/applications/application/list/${status}/`);

const GET_APPLICATIONS_SORTED_ENDPOINT = (sort) =>
  endpoint(`api/applications/application/${sort}/`);

export async function postApplicationEndpoint(payload, listingId) {
  const response = await axiosRequests.axiosPost(
    endpoint(`api/applications/petlisting/${listingId}/application/`),
    payload,
    { "Content-Type": "multipart/form-data" }, // Must set for file upload
  );

  return response;
}

export async function patchApplication(id, payload) {
  const response = await axiosRequests.axiosPatch(
    endpoint(`api/applications/application/${id}/`),
    payload,
    { "Content-Type": "multipart/form-data" }, // Must set for file upload
  );

  return response;
}

export async function getApplication(listingId) {
  const response = await axiosRequests.axiosGet(
    GET_APPLICATIONS_LISTING_ENDPOINT(listingId),
  );

  return response;
}
// ADD BACK FILTERS AS A PARAMATER AFTER
export async function getApplications(page = 1) {
  const existingParams = new URLSearchParams(window.location.search);
  if (!existingParams.toString()) {
    const response = await axiosRequests.axiosGet(GET_APPLICATIONS_ENDPOINT);
    return response;
  } else {
    const status = existingParams.get("status")
    const sort_by = existingParams.get("sort_by")

    if (status) {
      const response = await axiosRequests.axiosGet(
        GET_APPLICATIONS_STATUS_ENDPOINT(status),
      );

      return response;
    } else if (sort_by) {
      const response = await axiosRequests.axiosGet(
        GET_APPLICATIONS_SORTED_ENDPOINT(sort_by),
      );
  
      return response;
    }
  }
}

export async function getApplicationsStatus(status) {
  const params = {
    status : status
  }

  const queryString = new URLSearchParams(params).toString()
  const newUrl = `${window.location.origin}${window.location.pathname}?${queryString}`;
  window.history.pushState({ path: newUrl }, "", newUrl);

  const response = await axiosRequests.axiosGet(
    GET_APPLICATIONS_STATUS_ENDPOINT(status),
  );
  return response;
}

export async function getApplicationsSorted(sort) {
  const params = {
    sort_by : sort
  }

  const queryString = new URLSearchParams(params).toString()
  const newUrl = `${window.location.origin}${window.location.pathname}?${queryString}`;
  window.history.pushState({ path: newUrl }, "", newUrl);

  const response = await axiosRequests.axiosGet(
    GET_APPLICATIONS_SORTED_ENDPOINT(sort),
  );

  return response;
}

export async function getApplicationsNextPage(requestUrl) {
  const response = await axiosRequests.axiosGet(requestUrl);

  return response;
}
