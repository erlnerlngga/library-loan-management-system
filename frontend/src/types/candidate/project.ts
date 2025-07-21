export interface Project {
  createdAt: Date;
  id: string;
  levelId: string;
  numberOfParticipant: number;
  patnerId: string;
  projectStartDate: Date;
  projectStopDate: Date;
  projectTitle: string;
  statusProject: StatusProject;
}

export enum StatusProject {
  FINISH = 'FINISH',
  NOT_FINISH = 'NOT_FINISH',
}
