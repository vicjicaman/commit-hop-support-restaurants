import {
  IOpensource
} from "interfaces/opensource";

const serialize = (inp: any): any => {
  return inp
};

const deserialize = (inp: any): IOpensource => {
  if (!inp) {
    return inp;
  }

  return inp
};

class OpensourceData {
  OpensourceFactory: any;
  jsonDriver: any;

  constructor(opts: any) {
    this.jsonDriver = opts.json;
    this.OpensourceFactory = opts.OpensourceFactory;
  }

  async list(): Promise<IOpensource[]> {
    const res = await this.jsonDriver.list("opensources");
    return res.map((row: any) => 
      this.OpensourceFactory.create(deserialize(row))
    );
  }

  async get(id: number): Promise<IOpensource> {
    const res = await this.jsonDriver.get("opensources", id);
    return this.OpensourceFactory.create(deserialize(res))
  }

}

export default OpensourceData;
