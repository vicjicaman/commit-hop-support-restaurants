import {
  IProject
} from "interfaces/project";

class ProjectUseCases {
  ProjectData: any;

  constructor(opts: any) {
    this.ProjectData = opts.ProjectData;
  }

  async list(): Promise<IProject[]> {
    return await this.ProjectData.list();
  }

  async get(id: number): Promise<IProject> {
    return await this.ProjectData.get(id);
  }

}

export default ProjectUseCases;
