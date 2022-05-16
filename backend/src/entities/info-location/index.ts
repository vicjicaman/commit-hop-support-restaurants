import { IInfoLocation } from "interfaces/info-location";

type Owner = {
  name: string;
  image: string;
};
 
export class InfoLocation implements IInfoLocation {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  images: string[];
  address: string;
  country: string;

  constructor(inp: IInfoLocation) {
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

export default InfoLocation;
