import axios from "axios";

axios.defaults.xsrfCookieName = "CSRF-TOKEN";
axios.defaults.xsrfHeaderName = "X-CSRF-Token";
axios.defaults.withCredentials = true;

export async function axiosGet(endpoint, params = {}) {
  const response = await axios.get(endpoint, {
    params,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return {
    headers: response.headers,
    data: response.data,
    status: response.status,
  };
}

export async function axiosPost(endpoint, payload, additionalHeaders = {}) {
  const response = await axios.post(endpoint, payload, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...additionalHeaders,
    },
  });

  return response;
}

export async function axiosPut(endpoint, payload) {
  const response = await axios.put(endpoint, payload, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return response;
}

export async function axiosDelete(endpoint, payload) {
  const response = await axios.delete(endpoint, payload, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return response;
}
