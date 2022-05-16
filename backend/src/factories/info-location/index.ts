import { IInfoLocation } from "interfaces/info-location";
import InfoLocation from "entities/info-location";

export class InfoLocationFactory {
  constructor() {}

  create(input: IInfoLocation): InfoLocation {
    return new InfoLocation(input);
  }
}


export default InfoLocationFactory;
