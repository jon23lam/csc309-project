import * as axiosRequests from "./axiosRequests";
import { endpoint } from "../utils/endpoint";

// Here is where we write out functions for the requests
// For example logging in would look something like this

export const SIGN_IN_ENDPOINT = endpoint("api/token/");

export const GET_USER_ENDPOINT = endpoint("api/accounts/me/");

export async function signInUser(payload) {
  const response = await axiosRequests.axiosPostNoAuth(
    SIGN_IN_ENDPOINT,
    payload,
  );

  return response;
}

export async function getMe() {
  const response = await axiosRequests.axiosGet(GET_USER_ENDPOINT);

  return response;
}

export default {
  signInUser,
  getMe,
};
