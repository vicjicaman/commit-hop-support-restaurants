import { IBorderPoint } from "interfaces/border-point";
import BorderPoint from "entities/border-point";

export class BorderPointFactory {
  constructor() {}

  create(input: IBorderPoint): BorderPoint {
    return new BorderPoint(input);
  }
}


export default BorderPointFactory;
