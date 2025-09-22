export enum AccStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  CLOSED = "CLOSED",
}

export interface AccountStatus {
  StatusId: number;
  Status: AccStatus;
}
