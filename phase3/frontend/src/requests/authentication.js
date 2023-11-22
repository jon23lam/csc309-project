import axios from "axios";
import * as axiosRequests from "./axiosRequests";

// Here is where we write out functions for the requests
// For example logging in would look something like this 


export const SIGN_IN_ENDPOINT = "http://localhost:8000/api/token/";

export async function signInUser(payload) {
  const response = await axiosRequests.axiosPost(
    SIGN_IN_ENDPOINT,
    payload
  );

  return response;
}

export default {
  signInUser
}