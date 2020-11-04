require("dotenv").config();

export default {
  NODE_ENV: process.env.NODE_ENV || "development",
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/init_inc",
  port: process.env.PROD_PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "mySecretIsHardenoough",
};
