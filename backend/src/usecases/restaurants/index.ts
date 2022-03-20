import {
  IRestaurant,
  IRestaurantCreateInput,
  IRestaurantUpdateInput,
} from "interfaces/restaurants";

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

  async find({ latitude, longitude }: any): Promise<IRestaurant[]> {
    return await this.RestaurantData.find({ latitude, longitude });
  }

  async search(term: string): Promise<IRestaurant[]> {
    return await this.RestaurantData.search(term);
  }

  async update(restaurant: IRestaurant, input: any) {
    const { id } = restaurant;
    return await this.RestaurantData.update(id, input);
  }
}

export default RestaurantUseCases;
