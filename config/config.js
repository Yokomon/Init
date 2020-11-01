export default {
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/init_inc",
  port: process.env.PROD_PORT || 3000,
};
