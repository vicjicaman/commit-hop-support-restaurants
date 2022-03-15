import * as RestaurantData from "data/restaurants";

export const list = async (): Promise<any[]> => {
  return await RestaurantData.list();
};
