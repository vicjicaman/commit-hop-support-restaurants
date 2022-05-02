import {
  IBorderPoint
} from "interfaces/border-point";

const serialize = (inp: any): any => {
  return inp
};

const deserialize = (inp: any): IBorderPoint => {
  if (!inp) {
    return inp;
  }

  return inp
};

class BorderPointData {
  BorderPointFactory: any;
  jsonDriver: any;

  constructor(opts: any) {
    this.jsonDriver = opts.json;
    this.BorderPointFactory = opts.BorderPointFactory;
  }

  async list(): Promise<IBorderPoint[]> {
    const res = await this.jsonDriver.list("restaurants");
    return res.map((row: any) => 
      this.BorderPointFactory.create(deserialize(row))
    );
  }

  async get(id: number): Promise<IBorderPoint> {
    const res = await this.jsonDriver.get("restaurants", id);
    return this.BorderPointFactory.create(deserialize(res))
  }

}

export default BorderPointData;
