import {
  IBorderPoint
} from "interfaces/border-point";

class BorderPointUseCases {
  BorderPointData: any;

  constructor(opts: any) {
    this.BorderPointData = opts.BorderPointData;
  }

  async list(): Promise<IBorderPoint[]> {
    return await this.BorderPointData.list();
  }

  async get(id: number): Promise<IBorderPoint> {
    return await this.BorderPointData.get(id);
  }

}

export default BorderPointUseCases;
