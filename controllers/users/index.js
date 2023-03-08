const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const avatars = require("./avatars.js");
const verifyEmail = require("./verifyEmail");
const resendEmail = require("./resendEmail");
module.exports = {
  register,
  login,
  logout,
  avatars,
  verifyEmail,
  resendEmail,
};
