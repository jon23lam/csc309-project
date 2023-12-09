import * as axiosRequests from "./axiosRequests";
import { endpoint } from "../utils/endpoint";

const GET_SEEKER_ENDPOINT = (seekerId) =>
  endpoint(`api/accounts/seeker/${seekerId}/`);

export async function getSeeker(shelterId) {
  const response = await axiosRequests.axiosGet(GET_SEEKER_ENDPOINT(shelterId));

  return response;
}
