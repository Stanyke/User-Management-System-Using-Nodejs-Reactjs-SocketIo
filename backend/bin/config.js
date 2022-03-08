const dotenv = require("dotenv");

dotenv.config();

const {
  PORT,
  DB_URI,
  SESSION_SECRET_KEY
} = process.env;

const sessionTimeOut = 1000 * 60 * 60 * 24; //One day

module.exports = {
  localPort: PORT,
  dbUri: DB_URI,
  SessionSecretKey: SESSION_SECRET_KEY
};
