import {
  IRestaurant,
  IRestaurantCreateInput,
  IRestaurantUpdateInput,
} from "interfaces/restaurants";

const SEARCH_INDEX = "restaurants";

const FragmentFull = `id,
name,
description,
ST_Y(location::geometry) as latitude,
ST_X(location::geometry) as longitude,
owner,
images,
"supportedEmployees",
"preparedMeals",
"receivedDonations",
"createdAt",
"updatedAt"`;

const serialize = (inp: any): any => {
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
    owner: JSON.stringify(owner),
    images: JSON.stringify(images),
    supportedEmployees,
    preparedMeals,
    receivedDonations: parseInt(receivedDonations) * 100,
    createdAt,
    updatedAt,
  };
};

const deserialize = (inp: any): IRestaurant => {
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

class RestaurantData {
  RestaurantFactory: any;

  constructor(opts: any) {
    this.RestaurantFactory = opts.RestaurantFactory;
  }

  async init() {}

  async list(): Promise<IRestaurant[]> {
    return [];
  }

  async find({ latitude, longitude }: any): Promise<IRestaurant[]> {
    return []
  }

  async search(term: string): Promise<IRestaurant[]> {
    return [];
  }

  async get(id: number): Promise<IRestaurant> {
    return null;
  }

  async create(input: IRestaurantCreateInput) {
    return this.RestaurantFactory.create(deserialize(null));
  }

  async update(id: number, input: IRestaurantUpdateInput) {
      return this.RestaurantFactory.create(deserialize(null));
  }

  async remove(id: number) {}
}

export default RestaurantData;
