import { SearchTableColumn } from "@models/SearchTableColumn";

export const BOAT_COLUMNS: SearchTableColumn[] = [
  { key: "date", label: "date" },
  { key: "name", label: "name" },
  { key: "registrationId", label: "id" },
  { key: "race", label: "race" },
  { key: "action", label: "" },
];

export const RACE_COLUMNS: SearchTableColumn[] = [
  { key: "date", label: "date" },
  { key: "name", label: "name" },
  { key: "regatta", label: "regatta" },
  { key: "action", label: "" },
];

export const REGATTA_COLUMNS: SearchTableColumn[] = [
  { key: "date", label: "date" },
  { key: "name", label: "name" },
  { key: "action", label: "" },
];
