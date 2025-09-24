export enum AccStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  CLOSED = "CLOSED",
}

export interface AccountStatus {
  statusId: number;
  status: AccStatus;
}
