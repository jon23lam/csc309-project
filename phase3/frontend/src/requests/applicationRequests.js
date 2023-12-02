import * as axiosRequests from "./axiosRequests";
import { endpoint } from "../utils/endpoint";

const GET_APPLICATIONS_LISTING_ENDPOINT = (listingId) =>
  endpoint(`api/applications/application/list/${listingId}/`);

const GET_APPLICATIONS_ENDPOINT = endpoint(
  "api/applications/application/list/",
);

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
  // let filterParts = [];
  // let sortParts = [];

  // for (const [key, value] of Object.entries(filters.filters)) {
  //   filterParts.push(`${key}:${value}`);
  // }
  //
  // if (filters.sort_by) {
  //   for (const [key, value] of Object.entries(filters.sort_by)) {
  //     sortParts.push(`${key}:${value}`);
  //   }
  // }

  // const filterString =
  //   filterParts.length > 0 ? `[${filterParts.join(",")}]` : "[status:any]";
  // const sortString =
  //   sortParts.length > 0 ? `${sortParts.join(",")}` : "created_at:asc";
  // const params = {
  //   filters: filterString,
  //   sort_by: sortString,
  //   page: page,
  // };
  const response = await axiosRequests.axiosGet(
    GET_APPLICATIONS_ENDPOINT,
    //params,
  );

  return response;
}

export async function getApplicationsNextPage(requestUrl) {
  const response = await axiosRequests.axiosGet(requestUrl);

  return response;
}
