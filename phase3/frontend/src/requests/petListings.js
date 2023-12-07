import * as axiosRequests from "./axiosRequests";
import { endpoint } from "../utils/endpoint";

const GET_PET_LISTING_ENDPOINT = (listingId) =>
  endpoint(`api/petlistings/${listingId}/`);

const GET_PET_LISTINGS_ENDPOINT = endpoint("api/petlistings/list/");

export async function postPetListing(payload) {
  const response = await axiosRequests.axiosPost(
    endpoint("api/petlistings/"),
    payload,
    { "Content-Type": "multipart/form-data" }, // Must set for file upload
  );

  return response;
}

export async function patchPetListing(id, payload) {
  const response = await axiosRequests.axiosPatch(
    endpoint(`api/petlistings/${id}/`),
    payload,
    { "Content-Type": "multipart/form-data" }, // Must set for file upload
  );

  return response;
}

export async function getPetListing(listingId) {
  const response = await axiosRequests.axiosGet(
    GET_PET_LISTING_ENDPOINT(listingId),
  );

  return response;
}

export async function getInitialPetListings() {
  const filterString = "[status:any]";
  const sortString = "created_at:asc";
  const params = {
    filters: filterString,
    sort_by: sortString,
  };

  const response = await axiosRequests.axiosGet(
    GET_PET_LISTINGS_ENDPOINT,
    params,
  );

  return response;
}

export async function getPetListings(filters, page = 1) {
  let filterParts = [];
  let sortParts = [];

  for (const [key, value] of Object.entries(filters.filters)) {
    filterParts.push(`${key}:${value}`);
  }

  if (filters.sort_by) {
    for (const [key, value] of Object.entries(filters.sort_by)) {
      sortParts.push(`${key}:${value}`);
    }
  }

  const filterString =
    filterParts.length > 0 ? `[${filterParts.join(",")}]` : "[status:any]";
  const sortString =
    sortParts.length > 0 ? `${sortParts.join(",")}` : "created_at:asc";
  const params = {
    filters: filterString,
    sort_by: sortString,
    page: page,
  };
  const response = await axiosRequests.axiosGet(
    GET_PET_LISTINGS_ENDPOINT,
    params,
  );

  return response;
}

export async function getPetListingsNextPage(requestUrl) {
  const response = await axiosRequests.axiosGet(requestUrl);

  return response;
}

export default {
  getPetListing,
  getPetListings,
};
