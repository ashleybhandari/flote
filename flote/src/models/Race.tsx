export type Race = {
  _id?: string;
  name: string;
  startTime?: Date;
  finishTime?: Date;
  regattaId: string;
  boatIds: string[];
};
