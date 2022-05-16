import {
  IInfoLocation
} from "interfaces/info-location";

class InfoLocationUseCases {
  InfoLocationData: any;

  constructor(opts: any) {
    this.InfoLocationData = opts.InfoLocationData;
  }

  async list(): Promise<IInfoLocation[]> {
    return await this.InfoLocationData.list();
  }

  async get(id: number): Promise<IInfoLocation> {
    return await this.InfoLocationData.get(id);
  }

}

export default InfoLocationUseCases;
