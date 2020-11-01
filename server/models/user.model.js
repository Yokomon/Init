import mongoose from "mongoose";
import crypto from "crypto";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Name field is required",
  },
  email: {
    type: String,
    required: "Email needs to be filled",
    unique: "Email is already associated with an account",
    match: [/.+\@.+\..+/, "Email address is invalid"],
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  updated: Date,
  salt: String,
  hashed_password: {
    type: String,
    required: "Password field cannot be empty",
  },
});

UserSchema.virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

UserSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (error) {
      return `An error occured: ${error.message}`;
    }
  },
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()).toString();
  },
};

UserSchema.path("hashed_password").validate(function (v) {
  if (this._password && this._password.length < 6) {
    this.invalidate("password", "Password must be greater than 6 characters");
  }
  if (this.isNew && !this._password) {
    this.invalidate("password", "Password is required");
  }
}, null);

export default mongoose.model("User", UserSchema);
