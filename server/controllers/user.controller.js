import User from "./../models/user.model";
import errorHandler from "./../handlers/dbErrorHandler";
import extend from "lodash/extend";

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

// Update a user record

const update = async (req, res) => {
  try {
    let user = req.profile;
    user = extend(user, req.body);
    user.updated = Date.now();
    await user.save();
    user.salt = undefined;
    user.hashed_password = undefined;
    res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(error),
    });
  }
};

// Delete a user record
const remove = async (req, res) => {
  try {
    let user = req.profile;
    let deletedUser = await user.remove();
    deletedUser.salt = undefined;
    deletedUser.hashed_password = undefined;
    res.status(200).json(deletedUser);
  } catch (error) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(error),
    });
  }
};

const getProfilePicture = async (req, res) => {
  try {
    let user = req.profile;
    res.set("Content-Type", user.profile_picture.contentType);
    return res.send(user.profile_picture.data);
  } catch (error) {
    return res.status(400).json({
      error: `An error occured while fetching user picture: ${error}`,
    });
  }
};

export default { create, list, getUserId, read, update, remove, getProfilePicture };
