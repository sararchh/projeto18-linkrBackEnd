"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _pg = require('pg'); var _pg2 = _interopRequireDefault(_pg);
var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
_dotenv2.default.config();

let chachedDB = null;
let connectionParams = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionString: process.env.DATABASE_URL,
};

 async function connectDB() {
  if (chachedDB) {
    return chachedDB;
  }

  if (process.env.DATABASE_URL) {
    connectionParams = {
      connectionString: process.env.DATABASE_URL,
    };
  }

  if (process.env.MODE === "PROD") {
    connectionParams.ssl = {
      rejectUnauthorized: false,
    };
  }

  const { Pool } = _pg2.default;

  const db = new Pool(connectionParams);

  await db.connect();

  chachedDB = db;

  return db;
} exports.default = connectDB;