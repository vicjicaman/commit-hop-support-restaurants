
class ProjectController {
  ProjectUsecase: any;

  constructor(opts: any) {
    this.ProjectUsecase = opts.ProjectUsecase;
  }
  async list() {
    return await this.ProjectUsecase.list();
  }

  async get(id: number) {
    return await this.ProjectUsecase.get(id);
  }
}

export default ProjectController;
