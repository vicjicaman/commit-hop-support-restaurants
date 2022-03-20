export type Owner = {
  name: string;
  image: string;
};

export interface IRestaurant {
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
}

export interface IRestaurantCreateInput {
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  images: string[];
  owner: Owner;
  supportedEmployees: number;
  preparedMeals: number;
  receivedDonations: number;
}

export interface IRestaurantUpdateInput {
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  images: string[];
  owner: Owner;
  supportedEmployees: number;
  preparedMeals: number;
  receivedDonations: number;
}
