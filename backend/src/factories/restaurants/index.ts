import { IRestaurant } from "interfaces/restaurants";
import Restaurant from "entities/restaurants";

export class RestaurantFactory {
  constructor() {}

  create(input: IRestaurant): Restaurant {
    return new Restaurant(input);
  }
}


export default RestaurantFactory;
