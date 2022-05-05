import {
  IOpensource
} from "interfaces/opensource";

class OpensourceUseCases {
  OpensourceData: any;

  constructor(opts: any) {
    this.OpensourceData = opts.OpensourceData;
  }

  async list(): Promise<IOpensource[]> {
    return await this.OpensourceData.list();
  }

  async get(id: number): Promise<IOpensource> {
    return await this.OpensourceData.get(id);
  }

}

export default OpensourceUseCases;
