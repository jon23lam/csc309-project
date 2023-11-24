import * as axiosRequests from "./axiosRequests";
import { endpoint } from "../utils/endpoint";

const GET_SHELTER_ENDPOINT = (shelterId) =>
  endpoint(`api/accounts/shelter/${shelterId}/`);

const GET_SHELTERS_ENDPOINT = endpoint("api/accounts/shelters/");

export async function getShelter(shelterId) {
  const response = await axiosRequests.axiosGet(
    GET_SHELTER_ENDPOINT(shelterId)
  );

  return response;
}

export async function getListShelters() {
  const response = await axiosRequests.axiosGet(GET_SHELTERS_ENDPOINT);

  return response;
}

export default {
  getShelter,
  getListShelters,
};
