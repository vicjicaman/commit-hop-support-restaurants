import {
  IRestaurant
} from "interfaces/restaurant";

const serialize = (inp: any): any => {
  return inp
};

const deserialize = (inp: any): IRestaurant => {
  if (!inp) {
    return inp;
  }

  return inp
};

class RestaurantData {
  RestaurantFactory: any;
  jsonDriver: any;

  constructor(opts: any) {
    this.jsonDriver = opts.json;
    this.RestaurantFactory = opts.RestaurantFactory;
  }

  async list(): Promise<IRestaurant[]> {
    const res = await this.jsonDriver.list("restaurants");
    return res.rows.map((row: any) =>
      this.RestaurantFactory.create(deserialize(row))
    );
  }

  async get(id: number): Promise<IRestaurant> {
    const res = await this.jsonDriver.get("restaurant", id);
    return this.RestaurantFactory.create(deserialize(res.rows[0]))
  }

}

export default RestaurantData;
