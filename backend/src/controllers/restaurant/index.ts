
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
}

export default RestaurantController;
