export type SearchTableRow = {
  id: string;
  date: string;
  name: string;
  action: JSX.Element;
  regatta?: string;
  race?: string;
  registrationId?: string;
  participants?: string;
};
