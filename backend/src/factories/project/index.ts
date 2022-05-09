import { IProject } from "interfaces/project";
import Project from "entities/project";

export class ProjectFactory {
  constructor() {}

  create(input: IProject): Project {
    return new Project(input);
  }
}


export default ProjectFactory;
