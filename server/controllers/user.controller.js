import User from "./../models/user.model";
import errorHandler from "./../handlers/dbErrorHandler";

// Create new user record
const create = async (req, res) => {
  try {
    let user = new User(req.body);
    await user.save();
    return res.status(200).json({
      message: "User successfully signed up!",
    });
  } catch (error) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(error),
    });
  }
};

// List all users in the database
const list = async (req, res) => {
  try {
    let users = await User.find().select("_id name email created updated");
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(error),
    });
  }
};

// Get each user unique id from req.params{}
const getUserId = async (req, res, next) => {
  try {
    let user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({
        error: "User record not found",
      });
    }
    req.profile = user;
    next();
  } catch (error) {
    return res.status(400).json({
      error: "Could not retrieve the user credentials",
    });
  }
};

// Read each user record
const read = (req, res) => {
  let user = req.profile;
  user.salt = undefined;
  user.hashed_password = undefined;
  res.status(200).json(user);
};

export default { create, list, getUserId, read };
