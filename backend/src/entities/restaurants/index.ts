import { IRestaurant } from "interfaces/restaurants";

type Owner = {
  name: string;
  image: string;
};

export class Restaurant implements IRestaurant {
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

  constructor(inp: IRestaurant) {
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

    this.id = id;
    this.name = name;
    this.description = description;
    this.latitude = latitude;
    this.longitude = longitude;
    this.images = images;
    this.owner = owner;
    this.supportedEmployees = supportedEmployees;
    this.preparedMeals = preparedMeals;
    this.receivedDonations = receivedDonations;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export default Restaurant;
