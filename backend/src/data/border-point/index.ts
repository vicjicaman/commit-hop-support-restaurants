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
    const res = await this.jsonDriver.list("BorderPoints");
    return res.rows.map((row: any) =>
      this.BorderPointFactory.create(deserialize(row))
    );
  }

  async get(id: number): Promise<IBorderPoint> {
    const res = await this.jsonDriver.get("BorderPoint", id);
    return this.BorderPointFactory.create(deserialize(res.rows[0]))
  }

}

export default BorderPointData;
