require("dotenv").config()
const jwt = require('jsonwebtoken');
const jwtConfig = require('../configs/jwtConfig');

console.log('1231', jwtConfig.access);

module.exports = (payload) => ({
  accessToken: jwt.sign(
    payload,
    process.env.SECRET_ACCESS_TOKEN,
    jwtConfig.access
  ),
  refreshToken: jwt.sign(
    payload,
    process.env.SECRET_REFRESH_TOKEN,
    jwtConfig.refresh
  ),
});