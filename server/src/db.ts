import { db_credentials } from "./config";

const Pool = require("pg").Pool;
const pool = new Pool(db_credentials);

export default pool;
