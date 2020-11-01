import app from "./express";
import mongoose from "mongoose";
import config from "./../config/config";

mongoose.Promise = global.Promise;

mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.error(`An error occured while connecting to MongoDB: ${err.message}`);
});

db.on("open", () => {
  console.info(`Connection established with MongoDB`);
});

app.listen(config.port, () => {
  console.info(`Server running and listening on ${config.port}`);
});
