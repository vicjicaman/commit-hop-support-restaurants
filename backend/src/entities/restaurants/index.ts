import * as RestaurantData from "data/restaurants";
import { Restaurant } from "data/restaurants";
import _ from "lodash";

export const list = async (): Promise<Restaurant[]> => {
  return await RestaurantData.list();
};

export const get = async (id: number): Promise<Restaurant> => {
  return await RestaurantData.get(id);
};

export const find = async ({
  latitude,
  longitude,
}: any): Promise<Restaurant[]> => {
  return await RestaurantData.find({ latitude, longitude });
};
