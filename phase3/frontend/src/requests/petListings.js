import * as axiosRequests from "./axiosRequests";
import { endpoint } from "../utils/endpoint";

const GET_PET_LISTING_ENDPOINT = (listingId) =>
  endpoint(`api/petlistings/${listingId}/`);

const GET_PET_LISTINGS_ENDPOINT = endpoint("api/search/list/");

export async function postPetListing(payload) {
  try {
    const response = await axiosRequests.axiosPost(
      endpoint("api/petlistings/"),
      payload,
      { "Content-Type": "multipart/form-data" } // Must set for file upload
    );

    return response;
  } catch (err) {
    return err.response;
  }
}

export async function patchPetListing(id, payload) {
  try {
    const response = await axiosRequests.axiosPatch(
      endpoint(`api/petlistings/${id}/`),
      payload,
      { "Content-Type": "multipart/form-data" } // Must set for file upload
    );

    return response;
  } catch (err) {
    return err.response;
  }
}

export async function getPetListing(listingId) {
  const response = await axiosRequests.axiosGet(
    GET_PET_LISTING_ENDPOINT(listingId)
  );

  return response;
}

export async function getInitialPetListings() {
  const filterString = "[status:any]";
  const sortString = "created_at:asc";

  const existingParams = new URLSearchParams(window.location.search);

  if (!existingParams.toString()) {
    existingParams.set("filters", filterString);
    existingParams.set("sort_by", sortString);

    const newUrl = `${window.location.origin}${window.location.pathname}?${existingParams.toString()}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  }

  const requestUrl = `${GET_PET_LISTINGS_ENDPOINT}?${existingParams.toString()}`;

  const response = await axiosRequests.axiosGet(
    requestUrl
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
  const queryString = new URLSearchParams(params).toString();

  // Update the browser URL without reloading the page
  const newUrl = `${window.location.origin}${window.location.pathname}?${queryString}`;
  window.history.pushState({ path: newUrl }, "", newUrl);
  const response = await axiosRequests.axiosGet(
    GET_PET_LISTINGS_ENDPOINT,
    params
  );

  return response;
}

export async function getPetListingsNextPage(requestUrl) {
  const response = await axiosRequests.axiosGet(requestUrl);

  return response;
}

export async function deletePetListing(listingId) {
  const response = await axiosRequests.axiosDelete(
    GET_PET_LISTING_ENDPOINT(listingId)
  );

  return response;
}

export default {
  getPetListing,
  getPetListings,
  deletePetListing,
};
