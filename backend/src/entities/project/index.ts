import { IProject } from "interfaces/project";


export class Project implements IProject {
  id: number;
  name: string;
  description: string;
  webpage: string;
  logo: string;

  constructor(inp: IProject) {
    const {
      id,
      name,
      description,
      webpage,
      logo
    } = inp;

    this.id = id;
    this.name = name;
    this.description = description;
    this.webpage = webpage;
    this.logo = logo;
  }
}

export default Project;
