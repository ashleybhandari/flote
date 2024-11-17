export type Boat = {
  _id?: string;
  registrationId: string;
  name?: string;
  finishTime?: Date;
  dns?: boolean;
  participantNames: string[];
  raceId?: string;
  regattaId: string
};