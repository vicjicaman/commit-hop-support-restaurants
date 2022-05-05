import { IOpensource } from "interfaces/opensource";

type Owner = {
  name: string;
  image: string;
};

export class Opensource implements IOpensource {
  id: number;
  name: string;
  description: string;
  repository: string;
  logo: string;

  constructor(inp: IOpensource) {
    const {
      id,
      name,
      description,
      repository,
      logo
    } = inp;

    this.id = id;
    this.name = name;
    this.description = description;
    this.repository = repository;
    this.logo = logo;
  }
}

export default Opensource;
