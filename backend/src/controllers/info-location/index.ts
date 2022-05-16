
class InfoLocationController {
  InfoLocationUsecase: any;

  constructor(opts: any) {
    this.InfoLocationUsecase = opts.InfoLocationUsecase;
  }
  async list() {
    return await this.InfoLocationUsecase.list();
  }

  async get(id: number) {
    return await this.InfoLocationUsecase.get(id);
  }
}

export default InfoLocationController;
