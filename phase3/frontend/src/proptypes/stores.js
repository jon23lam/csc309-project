import PropTypes from "prop-types";

export const authStorePropTypes = PropTypes.shape({
  isAuthenticated: PropTypes.bool,
  loginUser: PropTypes.func,
  logoutUser: PropTypes.func,
});
