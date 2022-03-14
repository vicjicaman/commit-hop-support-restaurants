import * as RestaurantData from "data/restaurants";

export const list = async (): any[] => {
  return await RestaurantData.list();
};
