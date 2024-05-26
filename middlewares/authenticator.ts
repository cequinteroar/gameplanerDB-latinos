import jwt from "jwt-simple";
import moment from "moment";
const secret = process.env.JWTTOKEN || "";

export const ensureAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).send({
      message: "Request has no authentication header",
    });
  }

  const token = req.headers.authorization.replace(/['"]+/g, ""); // Eliminamos todas las comillas dentro del string del token

  try {
    let payLoad = jwt.decode(token, secret);

    if (payLoad.exp <= moment().unix()) {
      return res.status(401).send({
        message: "El token expired",
      });
    }
    req.user = payLoad;
  } catch (error) {
    console.log(error);
    return res.status(403).send({
      message: "Token not valid",
    });
  }

  next();
};
