export enum STATUS {
  NEW = "New",
  IN_PROGRESS = "In Progress",
  RESOLVED = "Resolved",
}

export type TicketType = {
  name: string;
  email: string;
  description: string;
  image: string;
  date: string;
  status: STATUS;
  response: string;
  _id?: any;
};
