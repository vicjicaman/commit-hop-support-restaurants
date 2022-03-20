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
}

export default RestaurantController;
