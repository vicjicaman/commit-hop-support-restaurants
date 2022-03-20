require("dotenv").config();
var { Client } = require("@opensearch-project/opensearch");

const client = new Client({
  node: process.env["SEARCH_URL"],
});

class SeachEngine {
  constructor() {}

  async query(index: string, query: any): Promise<any[]> {
    var response = await client.search({
      index,
      body: query,
    });

    return response.body.hits.hits.map(({ _source }: any) => _source);
  }
}

export default SeachEngine;
