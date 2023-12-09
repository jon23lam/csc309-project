import * as axiosRequests from "./axiosRequests";
import { endpoint } from "../utils/endpoint";

const GET_ALL_COMMENTS_ENDPOINT = (listingId) =>
  endpoint(`api/applications/application/${listingId}/comments/`);

const GET_COMMENT_ENDPOINT = (listingId, message_num) =>
  endpoint(
    `api/applications/application/${listingId}/comments/${message_num}/`,
  );

export async function postCommentEndpoint(listingId, payload) {
  const response = await axiosRequests.axiosPost(
    endpoint(`api/applications/application/${listingId}/comments/`),
    payload,
    { "Content-Type": "multipart/form-data" }, // Must set for file upload
  );

  return response;
}

export async function getComments(listingId) {
  const response = await axiosRequests.axiosGet(
    GET_ALL_COMMENTS_ENDPOINT(listingId),
  );

  return response;
}

export async function getCommentsNextPage(requestUrl) {
  const response = await axiosRequests.axiosGet(requestUrl);

  return response;
}
