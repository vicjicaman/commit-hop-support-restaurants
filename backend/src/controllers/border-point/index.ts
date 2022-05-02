
class BorderPointController {
  BorderPointUsecase: any;

  constructor(opts: any) {
    this.BorderPointUsecase = opts.BorderPointUsecase;
  }
  async list() {
    return await this.BorderPointUsecase.list();
  }

  async get(id: number) {
    return await this.BorderPointUsecase.get(id);
  }
}

export default BorderPointController;
