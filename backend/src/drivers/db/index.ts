require("dotenv").config();
const { Pool, Client } = require("pg");

const pool = new Pool({
  connectionString: process.env["DATABASE_URL"],
});

class Database {
  constructor() {}

  async query(sql: string, values: any[]): Promise<any[]> {
    return await pool.query(sql, values);
  }
}

export default Database;
