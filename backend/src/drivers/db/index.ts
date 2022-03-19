const { Client } = require("pg");

function Database({ connectionString, timeout }: any) {
  this.conn = new Client({
    connectionString,
  });
}

Database.prototype.query = function (sql: string): any[] {
  return this.conn.query(sql);
};

export default Database;
