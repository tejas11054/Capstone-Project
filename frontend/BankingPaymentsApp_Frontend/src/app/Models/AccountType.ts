export enum AccType {
  SAVINGS = "SAVINGS",
  CURRENT = "CURRENT",
  SALARY = "SALARY",
}

export interface AccountType {
  typeId: number;
  type: AccType;
}