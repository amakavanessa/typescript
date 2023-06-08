//you can use this in other files in same namespace
namespace App {
  export enum ProjectStatus {
    Active,
    completed,
  }

  //project type
  export class Project {
    constructor(
      public id: string,
      public title: string,
      public description: string,
      public people: number,
      public status: ProjectStatus
    ) {}
  }
}
