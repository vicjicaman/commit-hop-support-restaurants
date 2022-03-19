const { Pool } = require("pg");

function Database(connectionString: any, timeout: any) {
  this.conn = new Pool({
    connectionString,
  });
}

Database.prototype.query = async function (sql: string): any[] {
  const res = await this.conn.query(sql);
  return res.rows;
};

export default Database;
