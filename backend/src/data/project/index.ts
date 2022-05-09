import {
  IProject
} from "interfaces/project";

const serialize = (inp: any): any => {
  return inp
};

const deserialize = (inp: any): IProject => {
  if (!inp) {
    return inp;
  }

  return inp
};

class ProjectData {
  ProjectFactory: any;
  jsonDriver: any;

  constructor(opts: any) {
    this.jsonDriver = opts.json;
    this.ProjectFactory = opts.ProjectFactory;
  }

  async list(): Promise<IProject[]> {
    const res = await this.jsonDriver.list("projects");
    return res.map((row: any) => 
      this.ProjectFactory.create(deserialize(row))
    );
  }

  async get(id: number): Promise<IProject> {
    const res = await this.jsonDriver.get("projects", id);
    return this.ProjectFactory.create(deserialize(res))
  }

}

export default ProjectData;
