import jwt from "jwt-simple";
import moment from "moment";
const secret = process.env.JWTTOKEN || "";

exports.createToken = function (user) {
  const payLoad = {
    sub: user._id,
    name: user.name,
    lastname: user.lastname,
    role: user.role,
    iat: moment().unix(), // Creation date
    exp: moment().add(120, "days").unix(), // Expiration date
  };

  return jwt.encode(payLoad, secret);
};
