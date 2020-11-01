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

export default { create, list };
