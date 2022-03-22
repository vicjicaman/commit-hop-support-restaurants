import {
  IRestaurant,
  IRestaurantCreateInput,
  IRestaurantUpdateInput,
} from "interfaces/restaurants";

class RestaurantController {
  RestaurantUsecase: any;

  constructor(opts: any) {
    this.RestaurantUsecase = opts.RestaurantUsecase;
  }
  async list() {
    return await this.RestaurantUsecase.list();
  }

  async get(id: number) {
    return await this.RestaurantUsecase.get(id);
  }

  async find({ latitude, longitude }: any) {
    return this.RestaurantUsecase.find({ latitude, longitude });
  }

  async search(term: string) {
    return this.RestaurantUsecase.search(term);
  }

  async create(input: any) {
    return await this.RestaurantUsecase.create(input);
  }

  async update(restaurant: IRestaurant, input: any) {
    return await this.RestaurantUsecase.update(restaurant, input);
  }

  async remove(restaurant: IRestaurant) {
    return await this.RestaurantUsecase.remove(restaurant);
  }
}

export default RestaurantController;
