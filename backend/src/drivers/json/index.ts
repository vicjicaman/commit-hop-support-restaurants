require("dotenv").config();
import _ from "lodash"
import DATA from "./data"


class JsonData {
  constructor() { }

  async query(sql: string, values: any[]): Promise<any[]> {
    return null;
  }

  async list(type: string): Promise<any[]> {
    return (DATA as any)[type];
  }

  async get(type: string, id: string): Promise<any[]> {
    const data = (DATA as any)[type];
    return _.find(data, { id }) || null
  }

}

export default JsonData;