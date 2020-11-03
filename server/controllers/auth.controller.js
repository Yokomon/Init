import User from "./../models/user.model";
import config from "./../../config/config";
import jwt from "jsonwebtoken";
import expressJWT from "express-jwt";

const signin = async (req, res) => {
  try {
    if (!req.body.email.match(/.+\@.+\..+/)) {
      return res.status(400).json({
        error: "Email address is invalid",
      });
    }
    if (typeof req.body.email == "undefined") {
      return res.status(400).json({
        error: "Email field cannot be empty",
      });
    }
    if (req.body.password.length <= 0) {
      return res.status(400).json({
        error: "Password is required",
      });
    }
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        error: "User record not found",
      });
    }
    if (!user.authenticate(req.body.password)) {
      return res.status(400).json({
        error: "Password is incorrect, please check and try again",
      });
    }
    const token = jwt.sign({ _id: user._id }, config.jwtSecret);
    res.cookie("t", token, { expire: new Date() + 9999 });
    return res.status(200).json({
      token: token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(400).json({
      error: `An error occured in authentication: ${error.message}`,
    });
  }
};

const signout = (req, res) => {
  res.clearCookie("t");
  return res.status(200).json({
    message: "Signed out",
  });
};

const requireSignIn = expressJWT({
  secret: config.jwtSecret,
  userProperty: "auth",
  algorithms: ["HS256"],
});

const hasAuthorization = (req, res, next) => {
  try {
    if (!(req.auth && req.profile && req.auth._id == req.profile._id)) {
      return res.status(403).json({
        error: "You are not authorized to handle this operation",
      });
    }
    next();
  } catch (error) {
    return res.status(400).json({
      error: `ISE: ${error.message}`,
    });
  }
};

export default { signin, signout, requireSignIn, hasAuthorization };
