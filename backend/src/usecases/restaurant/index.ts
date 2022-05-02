import {
  IRestaurant
} from "interfaces/restaurant";

class RestaurantUseCases {
  RestaurantData: any;

  constructor(opts: any) {
    this.RestaurantData = opts.RestaurantData;
  }

  async list(): Promise<IRestaurant[]> {
    return await this.RestaurantData.list();
  }

  async get(id: number): Promise<IRestaurant> {
    return await this.RestaurantData.get(id);
  }

}

export default RestaurantUseCases;
