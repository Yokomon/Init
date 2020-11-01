import User from "./../models/user.model";
import config from "./../../config/config";
import jwt from "jsonwebtoken";

const signin = async (req, res) => {
  try {
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

export default { signin, signout };
