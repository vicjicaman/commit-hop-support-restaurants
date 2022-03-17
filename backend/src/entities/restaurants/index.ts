import * as RestaurantModel from "model/restaurants";
import { Restaurant } from "model/restaurants";
import _ from "lodash";

export const list = async (): Promise<Restaurant[]> => {
  return await RestaurantModel.list();
};

export const get = async (id: number): Promise<Restaurant> => {
  return await RestaurantModel.get(id);
};

export const find = async ({
  latitude,
  longitude,
}: any): Promise<Restaurant[]> => {
  return await RestaurantModel.find({ latitude, longitude });
};

export const search = async (term: string): Promise<Restaurant[]> => {
  return await RestaurantModel.search(term);
};
