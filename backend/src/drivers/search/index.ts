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

  async index(index: string, id: number, payload: any) {
    await client.index({
      id,
      index,
      body: payload,
      refresh: true,
    });
  }
}

export default SeachEngine;
