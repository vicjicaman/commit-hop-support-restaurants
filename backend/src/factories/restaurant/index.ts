import { IRestaurant } from "interfaces/restaurant";
import Restaurant from "entities/restaurant";

export class RestaurantFactory {
  constructor() {}

  create(input: IRestaurant): Restaurant {
    return new Restaurant(input);
  }
}


export default RestaurantFactory;
