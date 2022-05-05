
class OpensourceController {
  OpensourceUsecase: any;

  constructor(opts: any) {
    this.OpensourceUsecase = opts.OpensourceUsecase;
  }
  async list() {
    return await this.OpensourceUsecase.list();
  }

  async get(id: number) {
    return await this.OpensourceUsecase.get(id);
  }
}

export default OpensourceController;
