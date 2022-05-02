import { IBorderPoint } from "interfaces/border-point";

type Owner = {
  name: string;
  image: string;
};
 
export class BorderPoint implements IBorderPoint {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  images: string[];
  address: string;
  country: string;

  constructor(inp: IBorderPoint) {
    const {
      id,
      name,
      description,
      latitude,
      longitude,
      images,
      country,
      address
    } = inp;

    this.id = id;
    this.name = name;
    this.description = description;
    this.latitude = latitude;
    this.longitude = longitude;
    this.images = images;
    this.country = country;
    this.address = address;
  }
}

export default BorderPoint;
