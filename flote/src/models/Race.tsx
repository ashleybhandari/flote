export type Race = {
  _id?: string;
  name: string;
  startTime?: Date | string;
  finishTime?: Date | string;
  regattaId: string;
  boatIds: string[];
};
