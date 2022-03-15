import * as RestaurantData from "data/restaurants";

export type Owner = {
  name: string;
  image: string;
};

export type Restaurant = {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  images: string[];
  owner: Owner;
  supportedEmployees: number;
  preparedMeals: number;
  receivedDonations: number;
  createdAt: Date;
  updatedAt: Date;
};

const constructor = (inp: any): Restaurant => {
  if (!inp) {
    return inp;
  }

  const {
    id,
    name,
    description,
    latitude,
    longitude,
    owner,
    images,
    supportedEmployees,
    preparedMeals,
    receivedDonations,
    createdAt,
    updatedAt,
  } = inp;

  return {
    id,
    name,
    description,
    latitude,
    longitude,
    owner,
    images,
    supportedEmployees,
    preparedMeals,
    receivedDonations: receivedDonations / 100,
    createdAt,
    updatedAt,
  };
};

export const list = async (): Promise<Restaurant[]> => {
  const res = await RestaurantData.list();
  return res.map(constructor);
};

export const find = async ({
  latitude,
  longitude,
}: any): Promise<Restaurant[]> => {
  const res = await RestaurantData.find({
    latitude,
    longitude,
  });
  return res.map(constructor);
};

export const get = async (id: number): Promise<Restaurant> => {
  const res = await RestaurantData.get(id);
  return constructor(res);
};

export const create = async (inp: any) => {
  const res = await RestaurantData.create(inp);
  return constructor(res);
};

export const remove = async (id: number) => {
  const res = await RestaurantData.remove(id);
  return res;
};
