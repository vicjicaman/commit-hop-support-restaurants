import { IOpensource } from "interfaces/opensource";
import Opensource from "entities/opensource";

export class OpensourceFactory {
  constructor() {}

  create(input: IOpensource): Opensource {
    return new Opensource(input);
  }
}


export default OpensourceFactory;
