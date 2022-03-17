require("dotenv").config();
var { Client } = require("@opensearch-project/opensearch");

const client = new Client({
  node: process.env["SEARCH_URL"],
});

export default client;
