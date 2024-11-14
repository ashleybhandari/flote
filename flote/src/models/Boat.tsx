export type Boat = {
  _id?: string;
  registrationId: number;
  name?: string;
  finishTime?: Date;
  dns?: boolean;
  participantNames: string[];
  raceId: string;
};