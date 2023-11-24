import * as axiosRequests from "./axiosRequests";
import { endpoint } from "../utils/endpoint";

const GET_PET_LISTING_ENDPOINT = (listingId) =>
  endpoint(`api/petlistings/${listingId}/`);

const GET_PET_LISTINGS_ENDPOINT = endpoint("api/petlistings/list/");

export async function getPetListing(listingId) {
  const response = await axiosRequests.axiosGet(
    GET_PET_LISTING_ENDPOINT(listingId)
  );

  return response;
}

export async function getPetListings(filters) {
  const response = await axiosRequests.axiosGet(
    GET_PET_LISTINGS_ENDPOINT,
    filters
  );

  return response;
}

export default {
  getPetListing,
  getPetListings,
};
