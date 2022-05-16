import {
  IInfoLocation
} from "interfaces/info-location";

const serialize = (inp: any): any => {
  return inp
};

const deserialize = (inp: any): IInfoLocation => {
  if (!inp) {
    return inp;
  }

  return inp
};

class InfoLocationData {
  InfoLocationFactory: any;
  jsonDriver: any;

  constructor(opts: any) {
    this.jsonDriver = opts.json;
    this.InfoLocationFactory = opts.InfoLocationFactory;
  }

  async list(): Promise<IInfoLocation[]> {
    const res = await this.jsonDriver.list("info-locations");
    return res.map((row: any) => 
      this.InfoLocationFactory.create(deserialize(row))
    );
  }

  async get(id: number): Promise<IInfoLocation> {
    const res = await this.jsonDriver.get("info-locations", id);
    return this.InfoLocationFactory.create(deserialize(res))
  }

}

export default InfoLocationData;
