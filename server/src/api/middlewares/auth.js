const httpStatus = require("http-status");
const passport = require("passport");
const User = require("../models/user.model");
const APIError = require("../utils/APIError");

const SUPERADMIN = "superadmin";
const ADMIN = "admin";
const LOGGED_USER = "user";

const handleJWT = (req, res, next, roles) => async (err, user, info) => {
  const error = err || info;
  const logIn = Promise.promisify(req.logIn);
  const apiError = new APIError({
    message: error ? error.message : "Unauthorized",
    status: httpStatus.UNAUTHORIZED,
    stack: error ? error.stack : undefined
  });

  try {
    if (error || !user) throw error;
    await logIn(user, { session: false });
  } catch (e) {
    return next(apiError);
  }

  // check user role
  // if not exist => return error
  if (roles.length && !User.roles.includes(roles)) {
    apiError.status = httpStatus.FORBIDDEN;
    apiError.message = "Forbidden";
    return next(apiError);
  }
  if (roles === LOGGED_USER) {
    req.user = user;
    return next();
  } else if (roles === ADMIN) {
    if (user.role === "admin" || user.role === "superadmin") {
      req.user = user;
      return next();
    }
    
    apiError.status = httpStatus.FORBIDDEN;
    apiError.message = "Forbidden";
    return next(apiError);
  } else if (roles === SUPERADMIN) {
    if (user.role !== "superadmin") {
      apiError.status = httpStatus.FORBIDDEN;
      apiError.message = "Forbidden";
      return next(apiError);
    }
    req.user = user;
    return next();
  } else if (err || !user) {
    return next(apiError);
  }
  req.user = user;

  return next();
};

exports.ADMIN = ADMIN;
exports.LOGGED_USER = LOGGED_USER;

exports.authorize = (roles = User.roles) => (req, res, next) =>
  passport.authenticate(
    "jwt",
    { session: false },
    handleJWT(req, res, next, roles)
  )(req, res, next);

exports.oAuth = service => passport.authenticate(service, { session: false });
