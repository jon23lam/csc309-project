export const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;

export const endpoint = (action) => {
  return `${baseUrl}/${action}`;
};
