import * as axiosRequests from "./axiosRequests";
import { endpoint } from "../utils/endpoint";


const GET_POST_STRAY_ANIMALS_ENDPOINT = endpoint(`api/strayanimals/`);

const UPDATE_STRAY_ANIMALS_ENDPOINT = (id) => endpoint(`api/strayanimals/${id}/`);

export async function postStrayAnimal(payload) {
  const response = await axiosRequests.axiosPost(
    GET_POST_STRAY_ANIMALS_ENDPOINT,
    payload,
    {"Content-Type": "multipart/form-data"},
  );

  return response;
}

export async function getStrayAnimals(params) {
  const response = await axiosRequests.axiosGet(
    GET_POST_STRAY_ANIMALS_ENDPOINT,
    params
  );

  return response;
}

export async function updateStrayAnimal(id, payload) {
  const response = await axiosRequests.axiosPatch(
    UPDATE_STRAY_ANIMALS_ENDPOINT(id),
    payload,
    {"Content-Type": "multipart/form-data"},
  );

  return response;
}

