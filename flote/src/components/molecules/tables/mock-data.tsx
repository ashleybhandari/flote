export const REGATTAS = [
  {
    _id: "672190aedd385ea9631255b7",
    name: "regatta 1",
    adminId: "11",
    timekeeperIds: [],
  },
  {
    _id: "672190b1dd385ea9631255b9",
    name: "regatta 2",
    adminId: "22",
    timekeeperIds: [],
  },
];

export const RACES = [
  {
    _id: "3",
    name: "race 1",
    regattaId: "1",
    boatIds: [],
  },
  {
    _id: "4",
    name: "race 2",
    regattaId: "1",
    boatIds: [],
  },
];

export const BOATS = [
  {
    _id: "5",
    registrationId: 5,
    name: "boat 1",
    participantNames: [],
    raceId: "3"
  },
  {
    _id: "6",
    registrationId: 6,
    participantNames: [],
    raceId: "3"
  }
]
