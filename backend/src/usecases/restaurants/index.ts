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

  async create(input: any) {
    return await this.RestaurantData.create({
      ...input,
      owner: { name: "", image: "" },
    });
  }

  async update(restaurant: IRestaurant, input: any) {
    const { id } = restaurant;
    return await this.RestaurantData.update(id, input);
  }

  async remove(restaurant: IRestaurant) {
    const { id } = restaurant;
    return await this.RestaurantData.remove(id);
  }
}

export default RestaurantUseCases;
